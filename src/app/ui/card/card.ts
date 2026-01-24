import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-surface rounded-2xl shadow-xl overflow-hidden border border-slate-100 p-6">
      <ng-content></ng-content>
    </div>
  `,
  styles: [],
})
export class CardComponent { }
