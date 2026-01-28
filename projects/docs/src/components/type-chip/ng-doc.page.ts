import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../ng-doc.category';
import { TypeChipTypesDemoComponent } from './demos/types-demo.component';
import { TypeChipSizesDemoComponent } from './demos/sizes-demo.component';
import { TypeChipVariantsDemoComponent } from './demos/variants-demo.component';
import { TypeChipRoundedDemoComponent } from './demos/rounded-demo.component';
import { TypeChipPlaygroundComponent } from './demos/playground.component';

const TypeChipPage: NgDocPage = {
	title: 'Type Chip',
	category: ComponentsCategory,
	mdFile: [
		'./index.md',
		'./examples.md',
		'./style.md',
		'./api.md',
	],
	demos: {
		TypeChipTypesDemoComponent,
		TypeChipSizesDemoComponent,
		TypeChipVariantsDemoComponent,
		TypeChipRoundedDemoComponent,
	},
	playgrounds: {
		TypeChipPlayground: {
			target: TypeChipPlaygroundComponent,
			template: `<ng-doc-selector></ng-doc-selector>`,
		},
	},
};

export default TypeChipPage;
