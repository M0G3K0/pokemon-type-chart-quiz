import {
	Component,
	Input,
	Output,
	EventEmitter,
	HostBinding,
	AfterContentInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type RadioGroupLayout = 'vertical' | 'horizontal';
export type RadioGroupGap = 'sm' | 'md' | 'lg';

/**
 * pt-radio-group (Atom): ラジオボタンをグループ化するコンテナコンポーネント
 *
 * 複数の pt-radio-button をまとめ、単一選択の状態管理とレイアウトを提供。
 *
 * @example
 * ```html
 * <pt-radio-group name="difficulty" [(value)]="selectedDifficulty" layout="horizontal">
 *   <pt-radio-button [value]="'easy'">かんたん</pt-radio-button>
 *   <pt-radio-button [value]="'normal'">ふつう</pt-radio-button>
 *   <pt-radio-button [value]="'hard'">むずかしい</pt-radio-button>
 * </pt-radio-group>
 * ```
 */
@Component({
	selector: 'pt-radio-group',
	standalone: true,
	imports: [CommonModule],
	template: `<ng-content></ng-content>`,
	styles: [`
    :host {
      display: flex;
    }
    
    /* Layout variants */
    :host(.layout-vertical) {
      flex-direction: column;
    }
    
    :host(.layout-horizontal) {
      flex-direction: row;
      flex-wrap: wrap;
    }
    
    /* Gap variants - using semantic spacing tokens */
    :host(.gap-sm) {
      gap: var(--pt-spacing-gap-sm);
    }
    
    :host(.gap-md) {
      gap: var(--pt-spacing-gap-md);
    }
    
    :host(.gap-lg) {
      gap: var(--pt-spacing-gap-lg);
    }
  `],
})
export class PtRadioGroupComponent<T = unknown> implements AfterContentInit {
	/**
	 * Name attribute for the radio group (for form association).
	 */
	@Input() name = '';

	/**
	 * Currently selected value.
	 */
	@Input() value: T | null = null;

	/**
	 * Layout direction of the radio buttons.
	 */
	@Input() layout: RadioGroupLayout = 'vertical';

	/**
	 * Gap between radio buttons.
	 */
	@Input() gap: RadioGroupGap = 'md';

	/**
	 * Whether the entire group is disabled.
	 */
	@Input() disabled = false;

	/**
	 * Emitted when the selected value changes.
	 */
	@Output() readonly valueChange = new EventEmitter<T>();

	@HostBinding('class')
	get hostClasses(): string {
		return `layout-${this.layout} gap-${this.gap}`;
	}

	@HostBinding('attr.role')
	readonly role = 'radiogroup';

	@HostBinding('attr.aria-disabled')
	get ariaDisabled(): string | null {
		return this.disabled ? 'true' : null;
	}

	ngAfterContentInit(): void {
		// Initialization logic if needed
	}

	/**
	 * Called by child pt-radio-button when selected.
	 */
	selectValue(newValue: T): void {
		if (this.disabled) return;
		if (this.value !== newValue) {
			this.value = newValue;
			this.valueChange.emit(newValue);
		}
	}
}
