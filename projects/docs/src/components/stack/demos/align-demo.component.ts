import { Component } from '@angular/core';
import { StackComponent } from '@ui/pt-stack/pt-stack';
import { SurfaceComponent } from '@ui/pt-surface/pt-surface';
import { TextComponent } from '@ui/pt-text/pt-text';

/**
 * Demo: Stack Align & Justify
 */
@Component({
	selector: 'stack-align-demo',
	standalone: true,
	imports: [StackComponent, SurfaceComponent, TextComponent],
	template: `
		<div class="demo-container">
			<pt-text variant="label-sm" color="secondary">justify="between"</pt-text>
			<pt-stack direction="horizontal" gap="md" justify="between">
				<pt-surface variant="subtle" padding="sm" radius="sm">
					<pt-text variant="body-md">左</pt-text>
				</pt-surface>
				<pt-surface variant="subtle" padding="sm" radius="sm">
					<pt-text variant="body-md">右</pt-text>
				</pt-surface>
			</pt-stack>
		</div>
		<div class="demo-container">
			<pt-text variant="label-sm" color="secondary">align="center"</pt-text>
			<pt-stack direction="horizontal" gap="md" align="center">
				<pt-surface variant="subtle" padding="lg" radius="sm">
					<pt-text variant="body-md">大</pt-text>
				</pt-surface>
				<pt-surface variant="subtle" padding="sm" radius="sm">
					<pt-text variant="body-md">小</pt-text>
				</pt-surface>
			</pt-stack>
		</div>
	`,
	styles: [`
		:host {
			display: flex;
			flex-direction: column;
			gap: 16px;
		}
		.demo-container {
			display: flex;
			flex-direction: column;
			gap: 4px;
		}
	`],
})
export class StackAlignDemoComponent { }
