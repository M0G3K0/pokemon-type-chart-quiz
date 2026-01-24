/**
 * Style Dictionary Configuration
 * 
 * @what トークンJSONからCSS変数とTypeScript型を生成
 * @why コードとデザインの一貫性を保証し、型安全なトークン使用を可能にする
 * @failure 非定義トークンの使用はTypeScriptの型チェックで検出される
 */

import StyleDictionary from 'style-dictionary';

const config = {
	source: ['design-tokens/**/*.json'],
	log: {
		verbosity: 'verbose'
	},
	platforms: {
		css: {
			transformGroup: 'css',
			buildPath: 'src/styles/generated/',
			files: [
				{
					destination: 'tokens.css',
					format: 'css/variables',
					options: {
						outputReferences: true
					}
				}
			]
		},
		scss: {
			transformGroup: 'scss',
			buildPath: 'src/styles/generated/',
			files: [
				{
					destination: '_tokens.scss',
					format: 'scss/variables',
					options: {
						outputReferences: true
					}
				}
			]
		},
		ts: {
			transformGroup: 'js',
			buildPath: 'src/design-system/',
			files: [
				{
					destination: 'tokens.ts',
					format: 'javascript/es6'
				}
			]
		}
	}
};

const sd = new StyleDictionary(config);
await sd.buildAllPlatforms();

console.log('\n✅ Design tokens built successfully!');
console.log('   - src/styles/generated/tokens.css');
console.log('   - src/styles/generated/_tokens.scss');
console.log('   - src/design-system/tokens.ts');
