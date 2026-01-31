import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../ng-doc.category';
import { SurfaceVariantsDemoComponent } from './demos/variants-demo.component';
import { SurfacePaddingDemoComponent } from './demos/padding-demo.component';
import { SurfaceRadiusDemoComponent } from './demos/radius-demo.component';
import { SurfacePlaygroundComponent } from './demos/playground.component';

const SurfacePage: NgDocPage = {
	title: 'Surface',
	category: ComponentsCategory,
	mdFile: [
		'./index.md',
		'./examples.md',
		'./style.md',
		'./api.md',
	],
	demos: {
		SurfaceVariantsDemoComponent,
		SurfacePaddingDemoComponent,
		SurfaceRadiusDemoComponent,
	},
	playgrounds: {
		SurfacePlayground: {
			target: SurfacePlaygroundComponent,
			template: `<ng-doc-selector></ng-doc-selector>`,
		},
	},
};

export default SurfacePage;
