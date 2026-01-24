import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../domain/pokemon.service';
import { Pokemon } from '../../domain/pokemon.schema';
import { CardComponent } from '../../ui/card/card';
import { BadgeComponent } from '../../ui/badge/badge';
import { ButtonComponent } from '../../ui/button/button';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, CardComponent, BadgeComponent, ButtonComponent],
  template: `
    <div class="max-w-md mx-auto py-8 px-4">
      <app-card *ngIf="currentPokemon() as pokemon">
        <div class="text-center">
          <span class="text-text-secondary text-sm font-medium uppercase tracking-widest">Type Resistance Quiz</span>
          <h1 class="text-3xl font-extrabold text-text-primary mt-2 mb-6 capitalize">{{ pokemon.name }}</h1>
          
          <div class="relative bg-slate-50 rounded-xl p-4 mb-6 group">
            <img 
              [src]="pokemon.imageUrl" 
              [alt]="pokemon.name"
              class="w-48 h-48 mx-auto object-contain transition-transform group-hover:scale-110 [image-rendering:pixelated]"
            >
          </div>

          <div class="flex justify-center gap-2 mb-8">
            <app-badge *ngFor="let type of pokemon.types" [type]="type">
              {{ type }}
            </app-badge>
          </div>

          <div class="grid grid-cols-1 gap-3">
            <app-button variant="primary" (onClick)="next()">Next Pokemon</app-button>
            <app-button variant="secondary">Check Resistance</app-button>
          </div>
        </div>
      </app-card>
      
      <div *ngIf="!currentPokemon()" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    </div>
  `,
  styles: [],
})
export class QuizComponent implements OnInit {
  currentPokemon = signal<Pokemon | null>(null);

  constructor(private pokemonService: PokemonService) { }

  async ngOnInit() {
    await this.next();
  }

  async next() {
    this.currentPokemon.set(null);
    const pokemon = await this.pokemonService.getRandomPokemon();
    this.currentPokemon.set(pokemon);
  }
}
