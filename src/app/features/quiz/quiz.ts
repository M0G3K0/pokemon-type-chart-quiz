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
import { TextComponent } from '../../ui/pt-text/pt-text';
import { PtRadioButtonComponent, RadioButtonFeedbackState } from '../../ui/pt-radio-button';
import { POKEMON_TYPES, POKEMON_TYPES_MAP, getEffectiveness, PokemonType } from '../../domain/type-chart';

/** 回答後に次の問題へ進むまでの遅延（ミリ秒） */
const AUTO_ADVANCE_DELAY_MS = 1000;

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    TypeChipComponent,
    AvatarComponent,
    IconComponent,
    StackComponent,
    SurfaceComponent,
    GridComponent,
    TextComponent,
    PtRadioButtonComponent,
  ],
  template: `
    <pt-surface variant="ghost" padding="lg" class="quiz-container">
      <pt-card *ngIf="currentPokemon() as pokemon">
        <pt-card-header>
          <pt-stack direction="horizontal" justify="between" align="center">
            <pt-text variant="label-xs" color="secondary" transform="uppercase" [italic]="true">Phase 0: Battle Trial</pt-text>
            <pt-text variant="label-md" weight="bold">Lv. 100</pt-text>
          </pt-stack>
        </pt-card-header>
        <pt-card-content>
          <pt-stack direction="vertical" gap="lg" align="stretch">
            
            <!-- 攻撃側・防御側エリア -->
            <pt-surface variant="subtle" padding="lg" radius="xl" [border]="true">
              <pt-stack direction="responsive" gap="lg" align="center" justify="center">
                <!-- Attacker -->
                <pt-stack direction="vertical" gap="sm" align="center">
                  <pt-text variant="label-xs" color="secondary" transform="uppercase">こうげき側 (タイプ)</pt-text>
                  <pt-surface variant="card" padding="lg" radius="xl" [border]="true" class="attacker-card">
                    <pt-stack direction="vertical" gap="sm" align="center">
                      <pt-type-chip 
                        [type]="attackType()"
                        [showIcon]="true"
                        rounded="full"
                        size="lg">
                      </pt-type-chip>
                      <pt-text 
                        variant="body-lg" 
                        weight="bold"
                        [style.color]="'var(--pt-color-pokemon-text-' + attackType() + ')'"
                      >
                        {{ typeMap[attackType()] }}
                      </pt-text>
                    </pt-stack>
                  </pt-surface>
                </pt-stack>
                
                <pt-icon src="/icons/arrow-right-double.svg" size="lg" class="arrow-icon"></pt-icon>

                <!-- Defender -->
                <pt-stack direction="vertical" gap="sm" align="center">
                  <pt-text variant="label-xs" color="secondary" transform="uppercase">ぼうぎょ側 (ポケモン)</pt-text>
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
                        <pt-text variant="body-lg" weight="bold">{{ pokemon.name }}</pt-text>
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
              <pt-radio-button
                *ngFor="let choice of choices"
                [value]="choice"
                [selected]="selectedChoice() === choice"
                [feedbackState]="getChoiceFeedbackState(choice)"
                [disabled]="isChecked()"
                (radioSelect)="selectChoice(choice)"
              >
                <pt-text variant="body-lg" weight="bold">{{ choice }}</pt-text>
                <pt-text variant="label-xs" color="secondary">倍</pt-text>
              </pt-radio-button>
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
    
    .attacker-card {
      min-width: 8rem;
      text-align: center;
    }
    
    .arrow-icon {
      color: var(--pt-color-text-disabled);
    }
    
    .loading-placeholder {
      height: 20rem;
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

  /**
   * 選択肢のフィードバック状態を取得
   * pt-radio-button の feedbackState に渡す値を決定
   */
  getChoiceFeedbackState(choice: number): RadioButtonFeedbackState {
    if (!this.isChecked()) {
      return 'default';
    }

    const isSelected = this.selectedChoice() === choice;
    const isActual = this.actualEffectiveness() === choice;

    let result: RadioButtonFeedbackState = 'default';
    if (isSelected && isActual) {
      result = 'correct';
    } else if (isSelected && !isActual) {
      result = 'wrong';
    } else if (isActual) {
      result = 'actual';
    }

    console.log(`Choice ${choice}: isSelected=${isSelected}, isActual=${isActual}, result=${result}`);
    return result;
  }
}
