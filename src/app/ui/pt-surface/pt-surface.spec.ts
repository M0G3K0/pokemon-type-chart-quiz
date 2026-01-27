/**
 * SurfaceComponent Unit Tests
 *
 * @phase Phase 3: Component and Integration Testing
 * @blocker Current `vitest.config.ts` uses `environment: 'node'`.
 *          Importing Angular components triggers JIT compilation requirements.
 *          Requires proper Angular test setup (TestBed, @angular/compiler).
 *
 * @todo When Phase 3 is ready:
 *       1. Configure vitest with jsdom or Angular-specific environment
 *       2. Set up @angular/platform-browser-dynamic for JIT
 *       3. Restore TestBed-based component tests
 */

describe('SurfaceComponent', () => {
	it.todo('should create');

	describe('Variant', () => {
		it.todo('should apply default variant by default');
		it.todo('should apply subtle variant');
		it.todo('should apply card variant');
		it.todo('should apply ghost variant');
	});

	describe('Padding', () => {
		it.todo('should apply md padding by default');
		it.todo('should apply none padding');
		it.todo('should apply sm padding');
		it.todo('should apply lg padding');
	});

	describe('Radius', () => {
		it.todo('should apply md radius by default');
		it.todo('should apply none radius');
		it.todo('should apply sm radius');
		it.todo('should apply lg radius');
		it.todo('should apply xl radius');
		it.todo('should apply full radius');
	});

	describe('Border', () => {
		it.todo('should not have border by default');
		it.todo('should apply border when border=true');
	});
});
