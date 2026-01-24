/**
 * @what  レイヤー境界の依存関係を検査
 * @why   domain→ui/features、ui→featuresの逆依存を防ぎ、アーキテクチャの崩壊を防止するため
 * @failure  違反があるとdep-cruiserが非0で終了し、CIが失敗する
 */
const { withGuardrail } = require("../../utils/rule-helper");

module.exports = withGuardrail("guards/architecture/guard/layer-boundaries.guard.md", [
	{
		name: "domain-no-ui-features",
		comment: "domainは純粋計算のため、uiやfeaturesに依存してはならない",
		from: { path: "^src/app/domain" },
		to: { path: "^src/app/ui|^src/app/features" },
	},
	{
		name: "ui-no-features",
		comment: "uiは純粋なUI部品のため、featuresに依存してはならない",
		from: { path: "^src/app/ui" },
		to: { path: "^src/app/features" },
	},
	{
		name: "no-circular-dependencies",
		comment: "循環参照はメンテナンス性を著しく低下させる",
		from: {},
		to: { circular: true },
	},
]);
