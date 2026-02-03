import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../ng-doc.category';
import { TextVariantsDemoComponent } from './demos/variants-demo.component';
import { TextColorsDemoComponent } from './demos/colors-demo.component';
import { TextWeightsDemoComponent } from './demos/weights-demo.component';
import { TextPlaygroundComponent } from './demos/playground.component';

const TextPage: NgDocPage = {
	title: 'Text',
	category: ComponentsCategory,
	mdFile: [
		'./index.md',
		'./examples.md',
		'./style.md',
		'./api.md',
	],
	demos: {
		TextVariantsDemoComponent,
		TextColorsDemoComponent,
		TextWeightsDemoComponent,
	},
	playgrounds: {
		TextPlayground: {
			target: TextPlaygroundComponent,
			template: `<ng-doc-selector></ng-doc-selector>`,
		},
	},
};

export default TextPage;
