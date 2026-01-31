import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../ng-doc.category';
import { CardBasicDemoComponent } from './demos/basic-demo.component';
import { CardElevationDemoComponent } from './demos/elevation-demo.component';
import { CardSizesDemoComponent } from './demos/sizes-demo.component';
import { CardPlaygroundComponent } from './demos/playground.component';

const CardPage: NgDocPage = {
	title: 'Card',
	category: ComponentsCategory,
	mdFile: [
		'./index.md',
		'./examples.md',
		'./style.md',
		'./api.md',
	],
	demos: {
		CardBasicDemoComponent,
		CardElevationDemoComponent,
		CardSizesDemoComponent,
	},
	playgrounds: {
		CardPlayground: {
			target: CardPlaygroundComponent,
			template: `<ng-doc-selector></ng-doc-selector>`,
		},
	},
};

export default CardPage;
