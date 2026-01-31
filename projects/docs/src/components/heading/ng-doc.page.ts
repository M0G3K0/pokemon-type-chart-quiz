import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../ng-doc.category';
import { HeadingLevelsDemoComponent } from './demos/levels-demo.component';
import { HeadingSizesDemoComponent } from './demos/sizes-demo.component';
import { HeadingAccentDemoComponent } from './demos/accent-demo.component';
import { HeadingPlaygroundComponent } from './demos/playground.component';

const HeadingPage: NgDocPage = {
	title: 'Heading',
	category: ComponentsCategory,
	mdFile: [
		'./index.md',
		'./examples.md',
		'./style.md',
		'./api.md',
	],
	demos: {
		HeadingLevelsDemoComponent,
		HeadingSizesDemoComponent,
		HeadingAccentDemoComponent,
	},
	playgrounds: {
		HeadingPlayground: {
			target: HeadingPlaygroundComponent,
			template: `<ng-doc-selector></ng-doc-selector>`,
		},
	},
};

export default HeadingPage;
