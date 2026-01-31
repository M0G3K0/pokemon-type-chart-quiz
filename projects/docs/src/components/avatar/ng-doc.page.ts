import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../ng-doc.category';
import { AvatarSizesDemoComponent } from './demos/sizes-demo.component';
import { AvatarShapesDemoComponent } from './demos/shapes-demo.component';
import { AvatarPixelatedDemoComponent } from './demos/pixelated-demo.component';
import { AvatarPlaygroundComponent } from './demos/playground.component';

const AvatarPage: NgDocPage = {
	title: 'Avatar',
	category: ComponentsCategory,
	mdFile: [
		'./index.md',
		'./examples.md',
		'./style.md',
		'./api.md',
	],
	demos: {
		AvatarSizesDemoComponent,
		AvatarShapesDemoComponent,
		AvatarPixelatedDemoComponent,
	},
	playgrounds: {
		AvatarPlayground: {
			target: AvatarPlaygroundComponent,
			template: `<ng-doc-selector></ng-doc-selector>`,
		},
	},
};

export default AvatarPage;
