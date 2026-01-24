/**
 * @what  ルート定義のLazy Loadingをチェックするスクリプト
 * @why   初期ロード時間を短縮するため
 * @failure  Eager Loadingが見つかった場合、プロセスは非0で終了する
 * @guardrail guards/ux/guard/lazy-loading.guard.md
 */

const fs = require("fs");
const path = require("path");

const ROUTES_FILE = path.join(__dirname, "../../../src/app/app.routes.ts");

// 許容されるコンポーネント名（レイアウトなど）
const ALLOWED_EAGER_COMPONENTS = ["LayoutComponent"];

function main() {
	console.log("🛡️ Checking Lazy Loading in routes...\n");

	if (!fs.existsSync(ROUTES_FILE)) {
		console.log("⚠️ app.routes.ts not found. Skipping.");
		return;
	}

	const content = fs.readFileSync(ROUTES_FILE, "utf-8");
	const lines = content.split("\n");
	let errorCount = 0;

	lines.forEach((line, index) => {
		// "component:" が含まれており、かつ "loadComponent:" ではない行を検出
		// コメント行でなければ
		if (
			line.includes("component:") &&
			!line.includes("loadComponent:") &&
			!line.trim().startsWith("//")
		) {
			// 例外チェック
			const isAllowed = ALLOWED_EAGER_COMPONENTS.some((comp) => line.includes(comp));

			if (!isAllowed) {
				console.error(
					`❌ Eager loading detected at line ${index + 1}: ${line.trim()}`
				);
				errorCount++;
			}
		}
	});

	if (errorCount > 0) {
		console.error(
			`\n❌ Found ${errorCount} eager loading routes. Please use 'loadComponent'.`
		);
		console.error(`   See: guards/ux/guard/lazy-loading.guard.md`);
		process.exit(1);
	} else {
		console.log("✅ All routes seem to be lazy-loaded.");
		process.exit(0);
	}
}

if (require.main === module) {
	main();
}
