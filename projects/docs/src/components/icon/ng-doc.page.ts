import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../ng-doc.category';
import { IconSizesDemoComponent } from './demos/sizes-demo.component';
import { IconTypesDemoComponent } from './demos/types-demo.component';
import { IconPlaygroundComponent } from './demos/playground.component';

const IconPage: NgDocPage = {
	title: 'Icon',
	category: ComponentsCategory,
	mdFile: [
		'./index.md',
		'./examples.md',
		'./style.md',
		'./api.md',
	],
	demos: {
		IconSizesDemoComponent,
		IconTypesDemoComponent,
	},
	playgrounds: {
		IconPlayground: {
			target: IconPlaygroundComponent,
			template: `<ng-doc-selector></ng-doc-selector>`,
		},
	},
};

export default IconPage;
