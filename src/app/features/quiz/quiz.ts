import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../domain/pokemon.service';
import { Pokemon } from '../../domain/pokemon.schema';
import { CardComponent, CardHeaderComponent, CardContentComponent } from '../../ui/pt-card';
import { TypeChipComponent } from '../../ui/pt-type-chip/pt-type-chip';
import { AvatarComponent } from '../../ui/pt-avatar/pt-avatar';
import { IconComponent } from '../../ui/pt-icon/pt-icon';
import { POKEMON_TYPES, POKEMON_TYPES_MAP, getEffectiveness, PokemonType } from '../../domain/type-chart';

/** 回答後に次の問題へ進むまでの遅延（ミリ秒） */
const AUTO_ADVANCE_DELAY_MS = 1000;

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, CardComponent, CardHeaderComponent, CardContentComponent, TypeChipComponent, AvatarComponent, IconComponent],
  template: `
    <div class="max-w-xl mx-auto py-8 px-4">
      <pt-card *ngIf="currentPokemon() as pokemon">
        <pt-card-header>
          <div class="flex justify-between items-center">
            <span class="text-text-secondary text-xs font-bold uppercase tracking-widest italic">Phase 0: Battle Trial</span>
            <span class="text-primary font-black">Lv. 100</span>
          </div>
        </pt-card-header>
        <pt-card-content class="text-center">
          
          <div class="flex flex-col sm:flex-row items-center gap-6 mb-8 justify-center bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
            <!-- Attacker -->
            <div class="flex flex-col items-center">
              <span class="text-[10px] font-black uppercase text-slate-400 mb-2">こうげき側 (タイプ)</span>
              <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 min-w-32 text-center transform transition-transform hover:scale-105">
                <pt-type-chip 
                  [type]="attackType()"
                  [showIcon]="true"
                  rounded="full"
                  size="lg"
                  class="mx-auto">
                </pt-type-chip>
                <span 
                  class="text-lg font-black"
                  [style.color]="'var(--color-text-type-' + attackType() + ')'"
                >
                  {{ typeMap[attackType()] }}
                </span>
              </div>
            </div>
            
            <pt-icon src="/icons/arrow-right-double.svg" size="lg" class="text-slate-200"></pt-icon>

            <!-- Defender -->
            <div class="flex flex-col items-center">
               <span class="text-[10px] font-black uppercase text-slate-400 mb-2">ぼうぎょ側 (ポケモン)</span>
               <div class="flex items-center gap-4 bg-white p-4 pr-8 rounded-3xl shadow-sm border border-slate-100 transform transition-transform hover:scale-105">
                <!-- TODO: pt-paper導入後に置き換え -->
                <div class="bg-slate-50 rounded-xl p-1 shadow-inner">
                  <pt-avatar
                    [src]="pokemon.imageUrl"
                    [alt]="pokemon.name"
                    size="lg"
                    shape="rounded"
                    [pixelated]="true">
                  </pt-avatar>
                </div>
                <div class="text-left">
                  <h2 class="text-xl font-extrabold">{{ pokemon.name }}</h2>
                  <div class="flex gap-1.5 mt-1">
                    <pt-type-chip *ngFor="let t of pokemon.types; let i = index" [type]="t" size="sm" rounded="sm">
                      {{ pokemon.jaTypes[i] }}
                    </pt-type-chip>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-8">
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

        </pt-card-content>
      </pt-card>

      <!-- ローディング状態: 現在は瞬時に完了するため空表示（300ms以上かかる場合のみスピナーを検討） -->
      <div *ngIf="!currentPokemon()" class="h-80"></div>
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

    // 自動進行: 1秒後に次の問題へ
    setTimeout(() => {
      this.next();
    }, AUTO_ADVANCE_DELAY_MS);
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
