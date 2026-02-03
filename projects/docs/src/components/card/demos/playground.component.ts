import { Component, Input } from '@angular/core';
import { CardComponent } from '@ui/pt-card/pt-card';
import { CardHeaderComponent } from '@ui/pt-card/pt-card-header';
import { CardContentComponent } from '@ui/pt-card/pt-card-content';
import { CardFooterComponent } from '@ui/pt-card/pt-card-footer';
import { HeadingComponent } from '@ui/pt-heading/pt-heading';
import { TextComponent } from '@ui/pt-text/pt-text';
import { ButtonComponent } from '@ui/pt-button/pt-button';

/**
 * Playground wrapper for Card
 */
@Component({
	selector: 'card-playground',
	standalone: true,
	imports: [
		CardComponent,
		CardHeaderComponent,
		CardContentComponent,
		CardFooterComponent,
		HeadingComponent,
		TextComponent,
		ButtonComponent,
	],
	template: `
		<pt-card [size]="size" [elevation]="elevation">
			<pt-card-header>
				<pt-heading [level]="3" size="md">{{ title }}</pt-heading>
			</pt-card-header>
			<pt-card-content>
				<pt-text variant="body-md">{{ content }}</pt-text>
			</pt-card-content>
			<pt-card-footer>
				<pt-button variant="primary" size="sm">{{ action }}</pt-button>
			</pt-card-footer>
		</pt-card>
	`,
	styles: [`
		:host {
			display: block;
			max-width: 320px;
		}
	`],
})
export class CardPlaygroundComponent {
	@Input() title = 'カードタイトル';
	@Input() content = 'カードのコンテンツです。';
	@Input() action = 'アクション';
	@Input() size: 'sm' | 'md' | 'lg' = 'md';
	@Input() elevation: 'flat' | 'raised' | 'overlay' = 'raised';
}
