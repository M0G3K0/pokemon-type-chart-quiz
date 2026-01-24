import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="classes"
      (click)="onClick.emit($event)"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [],
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() disabled: boolean = false;
  @Output() onClick = new EventEmitter<MouseEvent>();

  get classes() {
    const base = 'px-4 py-2 rounded-lg font-medium transition-all focus:outline-hidden focus:ring-2 focus:ring-offset-2 active:scale-95 cursor-pointer';
    const variants = {
      primary: 'bg-primary text-white hover:opacity-90 focus:ring-primary',
      secondary: 'bg-secondary text-white hover:opacity-90 focus:ring-secondary',
      danger: 'bg-danger text-white hover:opacity-90 focus:ring-danger',
    };
    const state = this.disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';
    return `${base} ${variants[this.variant]} ${state}`;
  }
}
