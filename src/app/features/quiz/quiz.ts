import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../domain/pokemon.service';
import { Pokemon } from '../../domain/pokemon.schema';
import { CardComponent, CardHeaderComponent, CardContentComponent } from '../../ui/pt-card';
import { TypeChipComponent } from '../../ui/pt-type-chip/pt-type-chip';
import { AvatarComponent } from '../../ui/pt-avatar/pt-avatar';
import { IconComponent } from '../../ui/pt-icon/pt-icon';
import { StackComponent } from '../../ui/pt-stack/pt-stack';
import { SurfaceComponent } from '../../ui/pt-surface/pt-surface';
import { GridComponent } from '../../ui/pt-grid/pt-grid';
import { POKEMON_TYPES, POKEMON_TYPES_MAP, getEffectiveness, PokemonType } from '../../domain/type-chart';

/** 回答後に次の問題へ進むまでの遅延（ミリ秒） */
const AUTO_ADVANCE_DELAY_MS = 1000;

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, CardComponent, CardHeaderComponent, CardContentComponent, TypeChipComponent, AvatarComponent, IconComponent, StackComponent, SurfaceComponent, GridComponent],
  template: `
    <pt-surface variant="ghost" padding="lg" class="quiz-container">
      <pt-card *ngIf="currentPokemon() as pokemon">
        <pt-card-header>
          <pt-stack direction="horizontal" justify="between" align="center">
            <span class="quiz-phase-label">Phase 0: Battle Trial</span>
            <span class="quiz-level">Lv. 100</span>
          </pt-stack>
        </pt-card-header>
        <pt-card-content>
          <pt-stack direction="vertical" gap="lg" align="stretch">
            
            <!-- 攻撃側・防御側エリア -->
            <pt-surface variant="subtle" padding="lg" radius="xl" [border]="true">
              <pt-stack direction="responsive" gap="lg" align="center" justify="center">
                <!-- Attacker -->
                <pt-stack direction="vertical" gap="sm" align="center">
                  <span class="quiz-section-label">こうげき側 (タイプ)</span>
                  <pt-surface variant="card" padding="lg" radius="xl" [border]="true" class="attacker-card">
                    <pt-stack direction="vertical" gap="sm" align="center">
                      <pt-type-chip 
                        [type]="attackType()"
                        [showIcon]="true"
                        rounded="full"
                        size="lg">
                      </pt-type-chip>
                      <span 
                        class="type-name"
                        [style.color]="'var(--pt-color-pokemon-text-' + attackType() + ')'"
                      >
                        {{ typeMap[attackType()] }}
                      </span>
                    </pt-stack>
                  </pt-surface>
                </pt-stack>
                
                <pt-icon src="/icons/arrow-right-double.svg" size="lg" class="arrow-icon"></pt-icon>

                <!-- Defender -->
                <pt-stack direction="vertical" gap="sm" align="center">
                  <span class="quiz-section-label">ぼうぎょ側 (ポケモン)</span>
                  <pt-surface variant="card" padding="md" radius="xl" [border]="true">
                    <pt-stack direction="horizontal" gap="md" align="center">
                      <pt-surface variant="subtle" padding="sm" radius="lg">
                        <pt-avatar
                          [src]="pokemon.imageUrl"
                          [alt]="pokemon.name"
                          size="lg"
                          shape="rounded"
                          [pixelated]="true">
                        </pt-avatar>
                      </pt-surface>
                      <pt-stack direction="vertical" gap="xs" align="start">
                        <span class="pokemon-name">{{ pokemon.name }}</span>
                        <pt-stack direction="horizontal" gap="xs">
                          <pt-type-chip *ngFor="let t of pokemon.types; let i = index" [type]="t" size="sm" rounded="sm">
                            {{ pokemon.jaTypes[i] }}
                          </pt-type-chip>
                        </pt-stack>
                      </pt-stack>
                    </pt-stack>
                  </pt-surface>
                </pt-stack>
              </pt-stack>
            </pt-surface>

            <!-- 選択肢 -->
            <pt-grid [columns]="2" [smColumns]="3" gap="md">
              <button
                *ngFor="let choice of choices"
                (click)="selectChoice(choice)"
                [class]="getChoiceButtonClass(choice)"
                [disabled]="isChecked()"
              >
                <span class="choice-value">{{ choice }}</span>
                <span class="choice-unit">倍</span>
              </button>
            </pt-grid>

          </pt-stack>
        </pt-card-content>
      </pt-card>

      <!-- ローディング状態 -->
      <pt-surface *ngIf="!currentPokemon()" variant="ghost" class="loading-placeholder"></pt-surface>
    </pt-surface>
  `,
  styles: [`
    .quiz-container {
      max-width: 36rem;
      margin-inline: auto;
    }
    
    .quiz-phase-label {
      font-size: var(--pt-font-size-xs);
      font-weight: var(--pt-font-weight-bold);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-style: italic;
      color: var(--pt-color-text-secondary);
    }
    
    .quiz-level {
      font-weight: var(--pt-font-weight-bold);
      color: var(--pt-color-text-primary);
    }
    
    .quiz-section-label {
      font-size: 0.625rem; /* 10px - 極小ラベル */
      font-weight: var(--pt-font-weight-bold);
      text-transform: uppercase;
      color: var(--pt-color-text-secondary);
    }
    
    .attacker-card {
      min-width: 8rem;
      text-align: center;
    }
    
    .type-name {
      font-size: var(--pt-font-size-lg);
      font-weight: var(--pt-font-weight-bold);
    }
    
    .arrow-icon {
      color: var(--pt-color-text-disabled);
    }
    
    .pokemon-name {
      font-size: var(--pt-font-size-xl);
      font-weight: var(--pt-font-weight-bold);
      color: var(--pt-color-text-primary);
    }
    
    .choice-value {
      font-size: var(--pt-font-size-3xl);
      font-weight: var(--pt-font-weight-bold);
    }
    
    .choice-unit {
      font-size: var(--pt-font-size-xs);
      font-weight: var(--pt-font-weight-bold);
      margin-inline-start: var(--pt-space-1);
      opacity: 0.7;
    }
    
    .loading-placeholder {
      height: 20rem;
    }
    
    /* 選択肢ボタン */
    .choice-button {
      display: flex;
      flex-direction: row;
      align-items: baseline;
      justify-content: center;
      padding: var(--pt-space-4) var(--pt-space-5);
      border-radius: var(--pt-radius-xl);
      border: 2px solid var(--pt-color-border-default);
      background-color: var(--pt-color-surface-card);
      color: var(--pt-color-text-primary);
      cursor: pointer;
      transition: all var(--pt-duration-normal) var(--pt-easing-default);
      box-shadow: var(--pt-shadow-sm);
    }
    
    .choice-button:hover:not(:disabled) {
      border-color: var(--pt-color-gray-400);
      background-color: var(--pt-color-surface-hovered);
    }
    
    .choice-button:active:not(:disabled) {
      transform: scale(0.95);
    }
    
    .choice-button--selected {
      background-color: var(--pt-color-gray-800);
      border-color: var(--pt-color-gray-800);
      color: var(--pt-color-text-inverse);
      transform: scale(1.05);
      box-shadow: var(--pt-shadow-lg);
    }
    
    .choice-button--correct {
      background-color: var(--pt-color-result-win-default);
      border-color: var(--pt-color-result-win-default);
      color: var(--pt-color-text-inverse);
    }
    
    .choice-button--wrong {
      background-color: var(--pt-color-result-lose-default);
      border-color: var(--pt-color-result-lose-default);
      color: var(--pt-color-text-inverse);
    }
    
    .choice-button--actual {
      background-color: var(--pt-color-surface-card);
      border-color: var(--pt-color-result-win-default);
      color: var(--pt-color-result-win-default);
      box-shadow: 0 0 0 4px var(--pt-color-result-win-subtle);
    }
    
    .choice-button--disabled {
      background-color: var(--pt-color-surface-hovered);
      border-color: var(--pt-color-border-subtle);
      color: var(--pt-color-text-disabled);
      opacity: 0.5;
      cursor: not-allowed;
    }
  `],
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
    const classes = ['choice-button'];

    if (this.isChecked()) {
      const isActual = this.actualEffectiveness() === choice;
      if (isSelected && isActual) {
        classes.push('choice-button--correct');
      } else if (isSelected && !isActual) {
        classes.push('choice-button--wrong');
      } else if (isActual) {
        classes.push('choice-button--actual');
      } else {
        classes.push('choice-button--disabled');
      }
    } else if (isSelected) {
      classes.push('choice-button--selected');
    }

    return classes.join(' ');
  }
}
