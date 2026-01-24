/**
 * @what  レイヤー境界の依存関係を検査
 * @why   core→features、domain→coreの逆依存を防ぎ、アーキテクチャの崩壊を防止するため
 * @failure  違反があるとdep-cruiserが非0で終了し、CIが失敗する
 */
const { withGuardrail } = require("../../utils/rule-helper");

module.exports = withGuardrail("guards/architecture/guard/layer-boundaries.guard.md", [
	{
		name: "core-cannot-depend-on-features",
		comment: "coreは再利用可能な部品のため、featuresに依存してはならない",
		from: { path: "^src/app/core" },
		to: { path: "^src/app/features" },
	},
	{
		name: "no-circular-dependencies",
		comment: "循環参照はメンテナンス性を著しく低下させる",
		from: {},
		to: { circular: true },
	},
]);

