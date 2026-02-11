/**
 * Style Dictionary Configuration
 *
 * @what トークンJSONからCSS変数を生成
 * @why コードとデザインの一貫性を保証する
 * @failure 非定義トークンの使用はガードレールで検出される
 */

import StyleDictionary from 'style-dictionary';

// ============================================================================
// Custom Parser - ファイル読み込み時にメタデータを除外
// ============================================================================

/**
 * $description などのメタデータフィールドを再帰的に除外する
 *
 * @why Style Dictionary v4 では複数ファイルの $description がマージ時に衝突警告を出す
 * @how パーサー段階でメタデータを除外し、マージ前に衝突の原因を排除
 * @benefit ソースファイルは $description を保持でき、開発者の可読性を維持
 */
const stripMetadataFields = (obj) => {
	if (typeof obj !== 'object' || obj === null) {
		return obj;
	}

	if (Array.isArray(obj)) {
		return obj.map(stripMetadataFields);
	}

	const result = {};
	for (const [key, value] of Object.entries(obj)) {
		// $description と $note はドキュメント用メタデータなので除外
		// $value, $type 等の DTCG トークン定義フィールドは保持
		if (key === '$description' || key === '$note') {
			continue;
		}
		result[key] = stripMetadataFields(value);
	}
	return result;
};

StyleDictionary.registerParser({
	name: 'json-strip-metadata',
	pattern: /\.json$/,
	parser: ({ contents }) => {
		const parsed = JSON.parse(contents);
		return stripMetadataFields(parsed);
	},
});

const config = {
	source: ['design-tokens/**/*.json'],
	parsers: ['json-strip-metadata'],
	log: {
		verbosity: 'verbose',
	},
	platforms: {
		css: {
			transformGroup: 'css',
			prefix: 'pt',
			buildPath: 'src/styles/generated/',
			files: [
				{
					destination: 'tokens.css',
					format: 'css/variables',
					options: {
						outputReferences: true,
					},
				},
			],
		},
		scss: {
			transformGroup: 'scss',
			prefix: 'pt',
			buildPath: 'src/styles/generated/',
			files: [
				{
					destination: '_tokens.scss',
					format: 'scss/variables',
					options: {
						outputReferences: true,
					},
				},
			],
		},
	},
};

const sd = new StyleDictionary(config);
await sd.buildAllPlatforms();

console.log('\n✅ Design tokens built successfully!');
console.log('   - src/styles/generated/tokens.css');
console.log('   - src/styles/generated/_tokens.scss');

