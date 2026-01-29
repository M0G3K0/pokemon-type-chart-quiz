import { Injectable, inject } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

/**
 * Asset path resolver service
 *
 * Resolves asset paths relative to the application's base href.
 * This is essential for deployments where the app is not at the root
 * (e.g., GitHub Pages at /pokemon-type-chart-quiz/).
 *
 * @example
 * ```typescript
 * @Component({...})
 * export class MyComponent {
 *   private assetPath = inject(AssetPathService);
 *
 *   getIconPath(): string {
 *     return this.assetPath.resolve('/icons/fire.svg');
 *   }
 * }
 * ```
 */
@Injectable({
	providedIn: 'root',
})
export class AssetPathService {
	private readonly baseHref: string;

	constructor() {
		// Inject APP_BASE_HREF with a fallback to '/' for development
		try {
			this.baseHref = inject(APP_BASE_HREF, { optional: true }) || '/';
		} catch {
			this.baseHref = '/';
		}
	}

	/**
	 * Resolve an asset path relative to the base href
	 * @param path - Path starting with '/' (e.g., '/icons/fire.svg')
	 * @returns Full path including base href
	 */
	resolve(path: string): string {
		// Ensure path starts with '/'
		const normalizedPath = path.startsWith('/') ? path : `/${path}`;

		// Remove trailing slash from baseHref if present, then combine
		const base = this.baseHref.endsWith('/')
			? this.baseHref.slice(0, -1)
			: this.baseHref;

		return `${base}${normalizedPath}`;
	}

	/**
	 * Resolve an icon path
	 * @param iconName - Icon name (e.g., 'fire', 'close')
	 * @returns Full path to the icon SVG
	 */
	icon(iconName: string): string {
		return this.resolve(`/icons/${iconName}.svg`);
	}
}
