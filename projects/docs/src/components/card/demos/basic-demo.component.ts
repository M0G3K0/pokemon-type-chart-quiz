import { Component } from '@angular/core';
import { CardComponent } from '@ui/pt-card/pt-card';
import { CardHeaderComponent } from '@ui/pt-card/pt-card-header';
import { CardContentComponent } from '@ui/pt-card/pt-card-content';
import { CardFooterComponent } from '@ui/pt-card/pt-card-footer';
import { HeadingComponent } from '@ui/pt-heading/pt-heading';
import { TextComponent } from '@ui/pt-text/pt-text';
import { ButtonComponent } from '@ui/pt-button/pt-button';

/**
 * Demo: Card Basic
 */
@Component({
	selector: 'card-basic-demo',
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
		<pt-card>
			<pt-card-header>
				<pt-heading [level]="3" size="md">カードタイトル</pt-heading>
			</pt-card-header>
			<pt-card-content>
				<pt-text variant="body-md">
					カードのメインコンテンツです。関連する情報をグループ化して表示します。
				</pt-text>
			</pt-card-content>
			<pt-card-footer>
				<pt-button variant="primary" size="sm">アクション</pt-button>
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
export class CardBasicDemoComponent { }
