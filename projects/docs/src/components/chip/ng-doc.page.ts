import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../ng-doc.category';
import { ChipBasicDemoComponent } from './demos/basic-demo.component';
import { ChipSizesDemoComponent } from './demos/sizes-demo.component';
import { ChipRoundedDemoComponent } from './demos/rounded-demo.component';
import { ChipPlaygroundComponent } from './demos/playground.component';

const ChipPage: NgDocPage = {
	title: 'Chip',
	category: ComponentsCategory,
	mdFile: [
		'./index.md',
		'./examples.md',
		'./style.md',
		'./api.md',
	],
	demos: {
		ChipBasicDemoComponent,
		ChipSizesDemoComponent,
		ChipRoundedDemoComponent,
	},
	playgrounds: {
		ChipPlayground: {
			target: ChipPlaygroundComponent,
			template: `<ng-doc-selector></ng-doc-selector>`,
		},
	},
};

export default ChipPage;

