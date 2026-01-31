import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../ng-doc.category';
import { RadioButtonFeedbackDemoComponent } from './demos/feedback-demo.component';
import { RadioButtonGroupDemoComponent } from './demos/group-demo.component';
import { RadioButtonPlaygroundComponent } from './demos/playground.component';

const RadioButtonPage: NgDocPage = {
	title: 'Radio Button',
	category: ComponentsCategory,
	mdFile: [
		'./index.md',
		'./examples.md',
		'./style.md',
		'./api.md',
	],
	demos: {
		RadioButtonFeedbackDemoComponent,
		RadioButtonGroupDemoComponent,
	},
	playgrounds: {
		RadioButtonPlayground: {
			target: RadioButtonPlaygroundComponent,
			template: `<ng-doc-selector></ng-doc-selector>`,
		},
	},
};

export default RadioButtonPage;
