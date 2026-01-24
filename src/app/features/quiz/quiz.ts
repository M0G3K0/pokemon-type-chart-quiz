import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../domain/pokemon.service';
import { Pokemon } from '../../domain/pokemon.schema';
import { CardComponent } from '../../ui/pt-card/pt-card';
import { TypeBadgeComponent } from './components/type-badge';
import { ButtonComponent } from '../../ui/pt-button/pt-button';
import { POKEMON_TYPES, POKEMON_TYPES_MAP, getEffectiveness, PokemonType } from '../../domain/type-chart';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, CardComponent, TypeBadgeComponent, ButtonComponent],
  template: `
    <div class="max-w-xl mx-auto py-8 px-4">
      <pt-card *ngIf="currentPokemon() as pokemon">
        <div class="text-center">
          <div class="flex justify-between items-center mb-4">
            <span class="text-text-secondary text-xs font-bold uppercase tracking-widest italic">Phase 0: Battle Trial</span>
            <span class="text-primary font-black">Lv. 100</span>
          </div>
          
          <div class="flex flex-col sm:flex-row items-center gap-6 mb-8 justify-center bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
            <!-- Attacker -->
            <div class="flex flex-col items-center">
              <span class="text-[10px] font-black uppercase text-slate-400 mb-2">こうげき側 (タイプ)</span>
              <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 min-w-32 text-center transform transition-transform hover:scale-105">
                <div 
                  class="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center shadow-inner"
                  [style.background-color]="'var(--color-type-' + attackType() + ')'"
                >
                  <img [src]="'/icons/' + attackType() + '.svg'" class="w-6 h-6 brightness-0 invert">
                </div>
                <span 
                  class="text-lg font-black"
                  [style.color]="'var(--color-text-type-' + attackType() + ')'"
                >
                  {{ typeMap[attackType()] }}
                </span>
              </div>
            </div>
            
            <div class="text-slate-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </div>

            <!-- Defender -->
            <div class="flex flex-col items-center">
               <span class="text-[10px] font-black uppercase text-slate-400 mb-2">ぼうぎょ側 (ポケモン)</span>
               <div class="flex items-center gap-4 bg-white p-4 pr-8 rounded-3xl shadow-sm border border-slate-100 transform transition-transform hover:scale-105">
                <div class="bg-slate-50 rounded-xl p-1 shadow-inner">
                  <img 
                    [src]="pokemon.imageUrl" 
                    [alt]="pokemon.name"
                    class="w-20 h-20 object-contain [image-rendering:pixelated]"
                  >
                </div>
                <div class="text-left">
                  <h2 class="text-xl font-extrabold">{{ pokemon.name }}</h2>
                  <div class="flex gap-1.5 mt-1">
                    <app-type-badge *ngFor="let t of pokemon.types; let i = index" [type]="t" class="scale-90 origin-left">
                      {{ pokemon.jaTypes[i] }}
                    </app-type-badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-8 pl-1">
            <p class="text-text-primary font-black text-xl mb-6 flex items-center gap-2">
              <span class="w-1.5 h-6 bg-primary rounded-full"></span>
              わざのダメージ倍率は？
            </p>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 px-2">
              <button
                *ngFor="let choice of choices"
                (click)="selectChoice(choice)"
                [class]="getChoiceButtonClass(choice)"
                [disabled]="isChecked()"
              >
                <span class="text-3xl font-black">{{ choice }}</span>
                <span class="text-xs font-bold ml-1 opacity-70">倍</span>
              </button>
            </div>
          </div>

          <!-- Result Feedback -->
          <div *ngIf="isChecked()" class="mb-8 p-6 rounded-3xl animate-in fade-in zoom-in duration-300 border-2" 
               [ngClass]="isCorrect() ? 'bg-secondary/5 border-secondary/20' : 'bg-danger/5 border-danger/20'">
            <div class="flex items-center justify-center gap-3 mb-1">
              <span class="text-4xl" [innerHtml]="isCorrect() ? '⭕' : '❌'"></span>
              <p class="text-3xl font-black" [ngClass]="isCorrect() ? 'text-secondary' : 'text-danger'">
                {{ isCorrect() ? '正解！' : '残念...' }}
              </p>
            </div>
            <p class="text-sm font-bold text-slate-500">
               {{ attackTypeMap[attackType()] }}わざ は {{ pokemon.name }} に対して 
               <span class="text-text-primary underline decoration-primary decoration-2 underline-offset-4">{{ actualEffectiveness() }}倍</span> です
            </p>
          </div>

          <!-- Actions -->
          <div class="h-14">
            <pt-button 
              *ngIf="isChecked()" 
              variant="primary" 
              (buttonClick)="next()"
              class="w-full"
            >
              つぎの問題へ
            </pt-button>
          </div>
        </div>
      </pt-card>

      <!-- Skeleton / Loading -->
      <div *ngIf="!currentPokemon()" class="flex flex-col justify-center items-center h-80">
        <div class="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent mb-4"></div>
      </div>
    </div>
  `,
  styles: [],
})
export class QuizComponent implements OnInit {
  currentPokemon = signal<Pokemon | null>(null);
  attackType = signal<PokemonType>('normal');
  choices = [4, 2, 1, 0.5, 0.25, 0];
  typeMap = POKEMON_TYPES_MAP;
  attackTypeMap = POKEMON_TYPES_MAP;

  selectedChoice = signal<number | null>(null);
  isChecked = signal(false);
  isCorrect = signal(false);
  actualEffectiveness = signal<number>(1);

  constructor(private pokemonService: PokemonService) { }

  async ngOnInit() {
    await this.next();
  }

  async next() {
    this.currentPokemon.set(null);
    this.selectedChoice.set(null);
    this.isChecked.set(false);
    this.isCorrect.set(false);

    const pokemon = await this.pokemonService.getRandomPokemon();
    const randomAttackType = POKEMON_TYPES[Math.floor(Math.random() * POKEMON_TYPES.length)] as PokemonType;

    this.currentPokemon.set(pokemon);
    this.attackType.set(randomAttackType);
    this.actualEffectiveness.set(getEffectiveness(randomAttackType, pokemon.types));
  }

  selectChoice(choice: number) {
    if (this.isChecked()) return;

    this.selectedChoice.set(choice);
    this.isCorrect.set(choice === this.actualEffectiveness());
    this.isChecked.set(true);
  }

  getChoiceButtonClass(choice: number) {
    const isSelected = this.selectedChoice() === choice;
    const base = 'flex flex-row items-baseline justify-center px-4 py-5 rounded-2xl transition-all shadow-sm border-2 cursor-pointer active:scale-95';

    if (this.isChecked()) {
      const isActual = this.actualEffectiveness() === choice;
      if (isSelected && isActual) return `${base} bg-secondary border-secondary text-white shadow-secondary/20`;
      if (isSelected && !isActual) return `${base} bg-danger border-danger text-white shadow-danger/20`;
      if (isActual) return `${base} bg-white border-secondary text-secondary ring-4 ring-secondary/10`;
      return `${base} bg-slate-50 border-slate-100 text-slate-300 opacity-50`;
    }

    return isSelected
      ? `${base} bg-primary border-primary text-white scale-105 shadow-lg shadow-primary/20`
      : `${base} bg-white border-slate-100 text-slate-700 hover:border-primary/50 hover:bg-slate-50`;
  }
}
