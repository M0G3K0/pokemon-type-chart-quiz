import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span 
      [class]="classes" 
      [style.background-color]="'var(--color-type-' + type.toLowerCase() + ')'"
    >
      <img 
        *ngIf="type" 
        [src]="'/icons/' + type.toLowerCase() + '.svg'" 
        class="w-3 h-3 mr-1.5 inline-block brightness-0 invert"
      >
      <ng-content></ng-content>
    </span>
  `,
  styles: [],
})
export class BadgeComponent {
  @Input() type: string = 'normal';

  get classes() {
    return 'px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-sm transition-colors duration-200';
  }
}
