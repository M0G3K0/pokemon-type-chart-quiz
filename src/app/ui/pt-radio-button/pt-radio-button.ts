import {
	Component,
	Input,
	Output,
	EventEmitter,
	HostBinding,
	HostListener,
	inject,
	forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PtRadioGroupComponent } from './pt-radio-group';

/**
 * Feedback state for radio buttons.
 * Used for quiz-like scenarios where selection results need visual feedback.
 */
export type RadioButtonFeedbackState = 'default' | 'correct' | 'wrong' | 'actual';

/**
 * pt-radio-button (Atom): 単一選択肢を表すラジオボタンコンポーネント
 *
 * 複数の選択肢から1つを選択する RadioButton パターンを提供。
 * feedbackState により正解/不正解などの検証結果を視覚的に表現可能。
 *
 * @example
 * ```html
 * <pt-radio-button [value]="1" [feedbackState]="'correct'">
 *   <pt-text variant="body-lg">1</pt-text>
 * </pt-radio-button>
 * ```
 */
@Component({
	selector: 'pt-radio-button',
	standalone: true,
	imports: [CommonModule],
	template: `<ng-content></ng-content>`,
	styles: [`
    :host {
      display: flex;
      flex-direction: row;
      align-items: baseline;
      justify-content: center;
      padding: var(--pt-radio-button-padding-y) var(--pt-radio-button-padding-x);
      border-radius: var(--pt-radio-button-radius);
      border: var(--pt-radio-button-border-width) solid var(--pt-radio-button-default-border);
      background-color: var(--pt-radio-button-default-bg);
      color: var(--pt-radio-button-default-text);
      cursor: pointer;
      transition: all var(--pt-motion-duration-quick) var(--pt-motion-easing-default);
      box-shadow: var(--pt-radio-button-shadow-default);
      user-select: none;
      outline: none;
    }
    
    :host(:hover:not(.disabled):not(.selected)) {
      border-color: var(--pt-radio-button-hover-border);
      background-color: var(--pt-radio-button-hover-bg);
    }
    
    :host(:active:not(.disabled)) {
      transform: scale(0.95);
    }
    
    :host(:focus-visible) {
      outline: 2px solid var(--pt-radio-button-focus-ring);
      outline-offset: 2px;
    }
    
    /* Selected state */
    :host(.selected) {
      background-color: var(--pt-radio-button-selected-bg);
      border-color: var(--pt-radio-button-selected-border);
      color: var(--pt-radio-button-selected-text);
      transform: scale(1.05);
      box-shadow: var(--pt-radio-button-shadow-selected);
    }
    
    /* Feedback states */
    :host(.feedback-correct) {
      background-color: var(--pt-radio-button-feedback-correct-bg);
      border-color: var(--pt-radio-button-feedback-correct-border);
      color: var(--pt-radio-button-feedback-correct-text);
    }
    
    :host(.feedback-wrong) {
      background-color: var(--pt-radio-button-feedback-wrong-bg);
      border-color: var(--pt-radio-button-feedback-wrong-border);
      color: var(--pt-radio-button-feedback-wrong-text);
    }
    
    :host(.feedback-actual) {
      background-color: var(--pt-radio-button-feedback-actual-bg);
      border-color: var(--pt-radio-button-feedback-actual-border);
      color: var(--pt-radio-button-feedback-actual-text);
      box-shadow: 0 0 0 4px var(--pt-radio-button-feedback-actual-ring);
    }
    
    /* Disabled state */
    :host(.disabled) {
      background-color: var(--pt-radio-button-disabled-bg);
      border-color: var(--pt-radio-button-disabled-border);
      color: var(--pt-radio-button-disabled-text);
      opacity: 0.5;
      cursor: not-allowed;
    }
  `],
})
export class PtRadioButtonComponent<T = unknown> {
	/**
	 * The value of this radio button.
	 * Compared with the parent group's value to determine selection.
	 */
	@Input({ required: true }) value!: T;

	/**
	 * Whether this radio button is disabled.
	 */
	@Input() disabled = false;

	/**
	 * Feedback state for visual indication of results (e.g., correct/wrong in quizzes).
	 */
	@Input() feedbackState: RadioButtonFeedbackState = 'default';

	/**
	 * Whether this radio button is currently selected.
	 * Can be set directly or managed by pt-radio-group.
	 */
	@Input() selected = false;

	/**
	 * Emitted when this radio button is clicked/selected.
	 */
	@Output() readonly radioSelect = new EventEmitter<T>();

	private readonly group = inject(forwardRef(() => PtRadioGroupComponent), { optional: true });

	@HostBinding('class.selected')
	get isSelected(): boolean {
		if (this.group) {
			return this.group.value === this.value;
		}
		return this.selected;
	}

	@HostBinding('class.disabled')
	get isDisabled(): boolean {
		return this.disabled || (this.group?.disabled ?? false);
	}

	@HostBinding('class.feedback-correct')
	get isFeedbackCorrect(): boolean {
		return this.feedbackState === 'correct';
	}

	@HostBinding('class.feedback-wrong')
	get isFeedbackWrong(): boolean {
		return this.feedbackState === 'wrong';
	}

	@HostBinding('class.feedback-actual')
	get isFeedbackActual(): boolean {
		return this.feedbackState === 'actual';
	}

	@HostBinding('attr.role')
	readonly role = 'radio';

	@HostBinding('attr.aria-checked')
	get ariaChecked(): string {
		return this.isSelected ? 'true' : 'false';
	}

	@HostBinding('attr.aria-disabled')
	get ariaDisabled(): string | null {
		return this.isDisabled ? 'true' : null;
	}

	@HostBinding('attr.tabindex')
	get tabIndex(): number {
		return this.isDisabled ? -1 : 0;
	}

	@HostListener('click')
	onClick(): void {
		if (this.isDisabled) return;

		this.radioSelect.emit(this.value);
		this.group?.selectValue(this.value);
	}

	@HostListener('keydown.space', ['$event'])
	@HostListener('keydown.enter', ['$event'])
	onKeydown(event: Event): void {
		event.preventDefault();
		this.onClick();
	}
}
