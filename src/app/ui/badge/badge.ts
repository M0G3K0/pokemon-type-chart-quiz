import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="classes">
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
    const base = 'px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-sm';
    const typeClass = `bg-type-${this.type.toLowerCase()}`;
    return `${base} ${typeClass}`;
  }
}
