/**
 * @what  一時ドキュメントの配置と管理を検査
 * @why   ドキュメントの散乱を防ぎ、AIが正しい場所に計画書を作成できるようにするため
 * @failure  npm run lint:docs でエラーとなり、CIが失敗する
 * @guardrail guards/maintenance/guard/temp-docs.guard.md
 */

const fs = require('fs');
const path = require('path');

// ガードレールドキュメントへのパス（エラーメッセージ用）
const GUARDRAIL_PATH = 'guards/maintenance/guard/temp-docs.guard.md';

// ルート直下で許可されている .md ファイル
const ALLOWED_ROOT_MD_FILES = [
	'README.md',
	'AGENTS.md',
	'CONTRIBUTING.md',
	'plan.md',
	'issue-body.md',  // gitignore済み（ローカル使用）
	'pr-body.md',     // gitignore済み（ローカル使用）
];

// docs/temp/ 内で status: done が許容される日数
const DONE_STATUS_GRACE_PERIOD_DAYS = 7;

/**
 * frontmatter をパースする
 * @param {string} content - ファイル内容
 * @returns {object|null} - frontmatter オブジェクト
 */
function parseFrontmatter(content) {
	const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (!match) return null;

	const frontmatter = {};
	const lines = match[1].split(/\r?\n/);
	for (const line of lines) {
		const [key, ...valueParts] = line.split(':');
		if (key && valueParts.length > 0) {
			frontmatter[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
		}
	}
	return frontmatter;
}

/**
 * ルート直下の不正な .md ファイルを検出
 * @param {string} projectRoot - プロジェクトルート
 * @returns {Array} - エラーリスト
 */
function checkRootMdFiles(projectRoot) {
	const errors = [];

	try {
		const files = fs.readdirSync(projectRoot);
		const mdFiles = files.filter(f => f.endsWith('.md'));

		for (const file of mdFiles) {
			if (!ALLOWED_ROOT_MD_FILES.includes(file)) {
				errors.push({
					type: 'error',
					file: `/${file}`,
					message: `不正な場所にドキュメントが存在します`,
					hint: `📌 対処法:\n   - 進行中のタスクの計画書なら → docs/temp/ に移動\n   - 完了したドキュメントなら → docs/archive/YYYY-MM/ に移動`,
					guardrail: GUARDRAIL_PATH,
				});
			}
		}
	} catch (e) {
		// ディレクトリが読めない場合は無視
	}

	return errors;
}

/**
 * docs/temp/ 内のファイルを検査
 * @param {string} projectRoot - プロジェクトルート
 * @returns {Array} - エラー/警告リスト
 */
function checkTempDocs(projectRoot) {
	const issues = [];
	const tempDir = path.join(projectRoot, 'docs', 'temp');

	if (!fs.existsSync(tempDir)) {
		return issues;
	}

	try {
		const files = fs.readdirSync(tempDir);
		const mdFiles = files.filter(f => f.endsWith('.md') && f !== '.gitkeep');

		for (const file of mdFiles) {
			const filePath = path.join(tempDir, file);
			const content = fs.readFileSync(filePath, 'utf-8');
			const frontmatter = parseFrontmatter(content);

			// frontmatter がない場合
			if (!frontmatter) {
				issues.push({
					type: 'error',
					file: `docs/temp/${file}`,
					message: `frontmatter がありません`,
					hint: `📌 対処法: ファイル先頭に以下を追加:\n   ---\n   task: "タスク名"\n   status: "in-progress"\n   created: "YYYY-MM-DD"\n   ---`,
					guardrail: GUARDRAIL_PATH,
				});
				continue;
			}

			// 必須フィールドのチェック
			const requiredFields = ['task', 'status', 'created'];
			const missingFields = requiredFields.filter(f => !frontmatter[f]);

			if (missingFields.length > 0) {
				issues.push({
					type: 'error',
					file: `docs/temp/${file}`,
					message: `frontmatter に必須フィールドがありません: ${missingFields.join(', ')}`,
					hint: `📌 対処法: frontmatter に以下を追加:\n   ${missingFields.map(f => `${f}: "..."`).join('\n   ')}`,
					guardrail: GUARDRAIL_PATH,
				});
				continue;
			}

			// status: done の放置チェック
			if (frontmatter.status === 'done' && frontmatter.created) {
				const createdDate = new Date(frontmatter.created);
				const now = new Date();
				const daysSinceCreated = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24));

				if (daysSinceCreated >= DONE_STATUS_GRACE_PERIOD_DAYS) {
					issues.push({
						type: 'warning',
						file: `docs/temp/${file}`,
						message: `アーカイブ待ちのドキュメントがあります (status: done, ${daysSinceCreated}日前)`,
						hint: `📌 対処法:\n   - ガードレール化必要 → guards/ にルール作成後、アーカイブ\n   - ガードレール化不要 → docs/archive/$(date +%Y-%m)/ に移動`,
						guardrail: GUARDRAIL_PATH,
					});
				}
			}
		}
	} catch (e) {
		// ディレクトリが読めない場合は無視
	}

	return issues;
}

/**
 * メイン検査関数
 * @param {string} projectRoot - プロジェクトルート
 * @returns {object} - 検査結果
 */
function lint(projectRoot) {
	const errors = [];
	const warnings = [];

	// ルート直下の不正ファイルチェック
	const rootIssues = checkRootMdFiles(projectRoot);

	// docs/temp/ の検査
	const tempIssues = checkTempDocs(projectRoot);

	// エラーと警告を分類
	for (const issue of [...rootIssues, ...tempIssues]) {
		if (issue.type === 'error') {
			errors.push(issue);
		} else {
			warnings.push(issue);
		}
	}

	return { errors, warnings };
}

/**
 * 結果を表示
 * @param {object} result - 検査結果
 */
function printResult(result) {
	const { errors, warnings } = result;

	if (errors.length === 0 && warnings.length === 0) {
		console.log('✅ ドキュメント配置チェック: OK');
		return true;
	}

	for (const error of errors) {
		console.log(`\n❌ ERROR: ${error.message}`);
		console.log(`   ファイル: ${error.file}`);
		console.log(`   ${error.hint}`);
		console.log(`   (${error.guardrail})`);
	}

	for (const warning of warnings) {
		console.log(`\n⚠️ WARNING: ${warning.message}`);
		console.log(`   ファイル: ${warning.file}`);
		console.log(`   ${warning.hint}`);
		console.log(`   (${warning.guardrail})`);
	}

	console.log(`\n📊 結果: ${errors.length} エラー, ${warnings.length} 警告`);

	return errors.length === 0;
}

// CLI 実行
if (require.main === module) {
	const projectRoot = process.argv[2] || process.cwd();
	const result = lint(projectRoot);
	const success = printResult(result);
	process.exit(success ? 0 : 1);
}

module.exports = {
	lint,
	printResult,
	ALLOWED_ROOT_MD_FILES,
	GUARDRAIL_PATH,
};
