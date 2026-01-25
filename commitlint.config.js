/**
 * @fileoverview Commitlint configuration
 * @what コミットメッセージの形式を検証
 * @why Conventional Commits 形式を強制し、変更履歴の一貫性を保つため
 * @guardrail guards/process/guard/development-workflow.guard.md
 */
module.exports = {
	extends: ["@commitlint/config-conventional"],
	rules: {
		// タイプは必須（feat, fix, chore など）
		"type-enum": [
			2,
			"always",
			[
				"feat", // 新機能
				"fix", // バグ修正
				"docs", // ドキュメント
				"style", // スタイル変更（コードの意味に影響しない）
				"refactor", // リファクタリング
				"perf", // パフォーマンス改善
				"test", // テスト
				"build", // ビルド
				"ci", // CI/CD
				"chore", // その他
				"revert", // リバート
			],
		],
		// タイプは小文字
		"type-case": [2, "always", "lower-case"],
		// サブジェクトは空でない
		"subject-empty": [2, "never"],
		// サブジェクトの最初は大文字禁止（英語の場合）
		"subject-case": [0], // 日本語も許容するため無効化
		// ヘッダーの最大長
		"header-max-length": [2, "always", 100],
	},
};
