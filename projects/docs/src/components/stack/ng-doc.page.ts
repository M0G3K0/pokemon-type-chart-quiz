import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../ng-doc.category';
import { StackDirectionDemoComponent } from './demos/direction-demo.component';
import { StackGapDemoComponent } from './demos/gap-demo.component';
import { StackAlignDemoComponent } from './demos/align-demo.component';
import { StackPlaygroundComponent } from './demos/playground.component';

const StackPage: NgDocPage = {
	title: 'Stack',
	category: ComponentsCategory,
	mdFile: [
		'./index.md',
		'./examples.md',
		'./style.md',
		'./api.md',
	],
	demos: {
		StackDirectionDemoComponent,
		StackGapDemoComponent,
		StackAlignDemoComponent,
	},
	playgrounds: {
		StackPlayground: {
			target: StackPlaygroundComponent,
			template: `<ng-doc-selector></ng-doc-selector>`,
		},
	},
};

export default StackPage;
