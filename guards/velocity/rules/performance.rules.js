/**
 * @what  Lighthouse CIの設定（パフォーマンス基準）
 * @why   ユーザー体験を損なわない速度を維持するため
 * @failure  スコアが基準を下回るとCIが失敗する
 * @guardrail guards/velocity/guard/performance.guard.md
 */

module.exports = {
	ci: {
		collect: {
			// ビルド済みファイルを静的配信して測定
			staticDistDir: "./dist/pokemon-bartle/browser",
			// 測定回数（平均を取るため複数回）
			numberOfRuns: 3,
		},
		assert: {
			assertions: {
				// パフォーマンススコアの基準（0〜1）
				"categories:performance": ["error", { minScore: 0.8 }],
				// アクセシビリティもついでにチェック（デザインの憲法とクロスチェック）
				"categories:accessibility": ["warn", { minScore: 0.9 }],
			},
		},
		upload: {
			target: "temporary-public-storage", // 一時的な公開ストレージにレポートをアップロード（CI用）
		},
	},
};
