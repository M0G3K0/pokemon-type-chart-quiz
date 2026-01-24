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
      class="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black text-white uppercase tracking-wider shadow-sm border border-white/10"
    >
      <img 
        *ngIf="type" 
        [src]="'/icons/' + type.toLowerCase() + '.svg'" 
        class="w-3.5 h-3.5 mr-1.5 brightness-0 invert"
      >
      <ng-content></ng-content>
    </span>
  `,
  styles: [],
})
export class BadgeComponent {
  @Input() type: string = 'normal';

  get classes() {
    return 'transition-all duration-200';
  }
}
