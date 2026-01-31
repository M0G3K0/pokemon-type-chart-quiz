import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../ng-doc.category';
import { SpinnerSizesDemoComponent } from './demos/sizes-demo.component';
import { SpinnerVariantsDemoComponent } from './demos/variants-demo.component';
import { SpinnerPlaygroundComponent } from './demos/playground.component';

const SpinnerPage: NgDocPage = {
	title: 'Spinner',
	category: ComponentsCategory,
	mdFile: [
		'./index.md',
		'./examples.md',
		'./style.md',
		'./api.md',
	],
	demos: {
		SpinnerSizesDemoComponent,
		SpinnerVariantsDemoComponent,
	},
	playgrounds: {
		SpinnerPlayground: {
			target: SpinnerPlaygroundComponent,
			template: `<ng-doc-selector></ng-doc-selector>`,
		},
	},
};

export default SpinnerPage;
