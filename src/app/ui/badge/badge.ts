import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="classes">
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
