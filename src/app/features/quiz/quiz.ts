import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../domain/pokemon.service';
import { Pokemon } from '../../domain/pokemon.schema';
import { CardComponent } from '../../ui/card/card';
import { BadgeComponent } from '../../ui/badge/badge';
import { ButtonComponent } from '../../ui/button/button';
import { POKEMON_TYPES, getEffectiveness, PokemonType } from '../../domain/type-chart';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, CardComponent, BadgeComponent, ButtonComponent],
  template: `
    <div class="max-w-xl mx-auto py-8 px-4">
      <!-- Question Card -->
      <app-card *ngIf="currentPokemon() as pokemon">
        <div class="text-center">
          <div class="flex justify-between items-center mb-4">
            <span class="text-text-secondary text-xs font-bold uppercase tracking-widest">Question</span>
            <span class="text-primary font-black">#{{ pokemon.id }}</span>
          </div>
          
          <h1 class="text-4xl font-black text-text-primary mb-6 capitalize">{{ pokemon.name }}</h1>
          
          <div class="relative bg-slate-50 rounded-3xl p-8 mb-8 group overflow-hidden">
            <div class="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
            <img 
              [src]="pokemon.imageUrl" 
              [alt]="pokemon.name"
              class="w-48 h-48 mx-auto object-contain relative z-10 transition-transform group-hover:scale-125 [image-rendering:pixelated]"
            >
          </div>

          <!-- Selection Logic -->
          <div class="mb-8">
            <p class="text-text-secondary font-bold mb-4">耐性（ダメージが1倍未満）をすべて選んでください</p>
            <div class="grid grid-cols-3 sm:grid-cols-6 gap-2">
              <button
                *ngFor="let type of allTypes"
                (click)="toggleSelection(type)"
                [class]="getTypeButtonClass(type)"
                [disabled]="isChecked()"
              >
                {{ type }}
              </button>
            </div>
          </div>

          <!-- Results -->
          <div *ngIf="isChecked()" class="mb-8 p-4 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500" 
               [ngClass]="isCorrect() ? 'bg-secondary/10 border-2 border-secondary/20' : 'bg-danger/10 border-2 border-danger/20'">
            <p class="text-2xl font-black mb-1" [ngClass]="isCorrect() ? 'text-secondary' : 'text-danger'">
              {{ isCorrect() ? '正解！' : '惜しい！' }}
            </p>
            <p class="text-sm font-bold text-text-secondary">
              正解の耐性: 
              <span *ngFor="let res of actualResistances()" class="inline-block bg-slate-200 text-slate-700 text-[10px] px-2 py-0.5 rounded-md mr-1 uppercase">
                {{ res }}
              </span>
            </p>
          </div>

          <!-- Actions -->
          <div class="grid grid-cols-1 gap-3">
            <app-button 
              *ngIf="!isChecked()" 
              variant="primary" 
              (onClick)="checkAnswer()"
              [disabled]="selectedTypes().length === 0"
            >
              回答を確認
            </app-button>
            <app-button 
              *ngIf="isChecked()" 
              variant="secondary" 
              (onClick)="next()"
            >
              次のポケモンへ
            </app-button>
          </div>
        </div>
      </app-card>
      
      <!-- Loading State -->
      <div *ngIf="!currentPokemon()" class="flex flex-col justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
        <p class="text-primary font-bold animate-pulse">読み込み中...</p>
      </div>
    </div>
  `,
  styles: [],
})
export class QuizComponent implements OnInit {
  currentPokemon = signal<Pokemon | null>(null);
  allTypes = POKEMON_TYPES;
  selectedTypes = signal<PokemonType[]>([]);
  isChecked = signal(false);
  isCorrect = signal(false);
  actualResistances = signal<PokemonType[]>([]);

  constructor(private pokemonService: PokemonService) { }

  async ngOnInit() {
    await this.next();
  }

  async next() {
    this.currentPokemon.set(null);
    this.selectedTypes.set([]);
    this.isChecked.set(false);
    this.isCorrect.set(false);

    const pokemon = await this.pokemonService.getRandomPokemon();
    this.currentPokemon.set(pokemon);

    // Calculate actual resistances
    const res: PokemonType[] = [];
    for (const t of POKEMON_TYPES) {
      if (getEffectiveness(t as PokemonType, pokemon.types) < 1) {
        res.push(t as PokemonType);
      }
    }
    this.actualResistances.set(res);
  }

  toggleSelection(type: PokemonType) {
    if (this.isChecked()) return;

    const current = this.selectedTypes();
    if (current.includes(type)) {
      this.selectedTypes.set(current.filter((t) => t !== type));
    } else {
      this.selectedTypes.set([...current, type]);
    }
  }

  checkAnswer() {
    const selected = [...this.selectedTypes()].sort();
    const actual = [...this.actualResistances()].sort();

    this.isCorrect.set(
      selected.length === actual.length && selected.every((v, i) => v === actual[i])
    );
    this.isChecked.set(true);
  }

  getTypeButtonClass(type: PokemonType) {
    const isSelected = this.selectedTypes().includes(type);
    const base = 'px-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all shadow-sm border-2';

    if (this.isChecked()) {
      const isActual = this.actualResistances().includes(type);
      if (isSelected && isActual) return `${base} bg-secondary border-secondary text-white`;
      if (isSelected && !isActual) return `${base} bg-danger border-danger text-white`;
      if (!isSelected && isActual) return `${base} bg-white border-secondary text-secondary opacity-50`;
      return `${base} bg-white border-slate-100 text-slate-300 opacity-30`;
    }

    return isSelected
      ? `${base} bg-primary border-primary text-white scale-105 shadow-md`
      : `${base} bg-white border-slate-100 text-slate-500 hover:border-primary/30`;
  }
}
