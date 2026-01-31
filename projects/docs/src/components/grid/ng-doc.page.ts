import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../ng-doc.category';
import { GridColumnsDemoComponent } from './demos/columns-demo.component';
import { GridResponsiveDemoComponent } from './demos/responsive-demo.component';
import { GridGapDemoComponent } from './demos/gap-demo.component';
import { GridPlaygroundComponent } from './demos/playground.component';

const GridPage: NgDocPage = {
	title: 'Grid',
	category: ComponentsCategory,
	mdFile: [
		'./index.md',
		'./examples.md',
		'./style.md',
		'./api.md',
	],
	demos: {
		GridColumnsDemoComponent,
		GridResponsiveDemoComponent,
		GridGapDemoComponent,
	},
	playgrounds: {
		GridPlayground: {
			target: GridPlaygroundComponent,
			template: `<ng-doc-selector></ng-doc-selector>`,
		},
	},
};

export default GridPage;
