/**
 * @what  ガードレールルールの共通ヘルパー
 * @why   各ルールファイルでの重複を排除し、一貫したフォーマットを保証するため
 * @failure  ヘルパーを使わないルールはガードレール参照が出力されない
 */

/**
 * ルールにガードレール参照とseverityを自動付与
 * @param {string} guardrailPath - ガードレールファイルのパス
 * @param {Array} rules - ルール配列
 * @returns {Array} 加工されたルール配列
 */
function withGuardrail(guardrailPath, rules) {
	return rules.map((r) => ({
		...r,
		severity: r.severity || "error",
		comment: r.comment ? `${r.comment}。See: ${guardrailPath}` : `See: ${guardrailPath}`,
	}));
}

module.exports = { withGuardrail };
