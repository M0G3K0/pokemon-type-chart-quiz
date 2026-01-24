const forbidden = require('./guards/architecture/rules/layer-boundaries.rules.js');

module.exports = {
	forbidden: forbidden,
	options: {
		doNotFollow: {
			path: 'node_modules',
		},
		tsPreCompilationDeps: true,
		tsConfig: {
			fileName: 'tsconfig.app.json',
		},
	},
};
