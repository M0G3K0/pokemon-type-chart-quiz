module.exports = {
	forbidden: [
		{
			name: 'domain-no-ui-features',
			comment: 'Domain layer should not depend on UI or Features layers',
			severity: 'error',
			from: { path: '^src/app/domain' },
			to: { path: '^src/app/ui|^src/app/features' },
		},
		{
			name: 'ui-no-features',
			comment: 'UI layer should not depend on Features layer',
			severity: 'error',
			from: { path: '^src/app/ui' },
			to: { path: '^src/app/features' },
		},
		{
			name: 'no-circular-dependencies',
			comment: 'Circular dependencies are not allowed',
			severity: 'error',
			from: {},
			to: { circular: true },
		},
	],
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
