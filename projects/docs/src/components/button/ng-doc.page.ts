import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../ng-doc.category';
import { ButtonVariantsDemoComponent } from './demos/variants-demo.component';
import { ButtonSizesDemoComponent } from './demos/sizes-demo.component';
import { ButtonDisabledDemoComponent } from './demos/disabled-demo.component';
import { ButtonPlaygroundComponent } from './demos/playground.component';

const ButtonPage: NgDocPage = {
	title: 'Button',
	category: ComponentsCategory,
	mdFile: [
		'./index.md',
		'./examples.md',
		'./style.md',
		'./api.md',
	],
	demos: {
		ButtonVariantsDemoComponent,
		ButtonSizesDemoComponent,
		ButtonDisabledDemoComponent,
	},
	playgrounds: {
		ButtonPlayground: {
			target: ButtonPlaygroundComponent,
			template: `<ng-doc-selector></ng-doc-selector>`,
		},
	},
};

export default ButtonPage;
