import { Component } from '@angular/core';
import { TypeChipComponent } from '@ui/pt-type-chip/pt-type-chip';

@Component({
  selector: 'type-chip-variants-demo',
  standalone: true,
  imports: [TypeChipComponent],
  template: `
    <!-- Text only -->
    <pt-type-chip type="fire">ほのお</pt-type-chip>
    
    <!-- Icon + Text -->
    <pt-type-chip type="fire" [showIcon]="true">ほのお</pt-type-chip>
    
    <!-- Icon only -->
    <pt-type-chip type="fire" [showIcon]="true" rounded="full"></pt-type-chip>
  `,
})
export class TypeChipVariantsDemoComponent { }
