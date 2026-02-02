import { Component, OnInit, signal } from '@angular/core';
import { PokemonService } from '../../domain/pokemon.service';
import { Pokemon } from '../../domain/pokemon.schema';
import { CardComponent, CardHeaderComponent, CardContentComponent } from '@ui/pt-card';
import { StackComponent } from '@ui/pt-stack';
import { SurfaceComponent } from '@ui/pt-surface';
import { GridComponent } from '@ui/pt-grid';
import { TextComponent } from '@ui/pt-text';
import { PtRadioButtonComponent, RadioButtonFeedbackState } from '@ui/pt-radio-button';
import { POKEMON_TYPES, getEffectiveness, PokemonType } from '../../domain/type-chart';
import { BattleCardComponent } from './components';

/** 回答後に次の問題へ進むまでの遅延（ミリ秒） */
const AUTO_ADVANCE_DELAY_MS = 1000;

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    StackComponent,
    SurfaceComponent,
    GridComponent,
    TextComponent,
    PtRadioButtonComponent,
    BattleCardComponent,
  ],
  template: `
    <pt-surface variant="ghost" padding="lg" class="quiz-container">
      @if (currentPokemon(); as pokemon) {
        <pt-card>
          <pt-card-header>
            <pt-stack direction="horizontal" justify="between" align="center">
              <pt-text variant="label-xs" color="secondary" transform="uppercase" [italic]="true">Phase 0: Battle Trial</pt-text>
              <pt-text variant="label-md" weight="bold">Lv. 100</pt-text>
            </pt-stack>
          </pt-card-header>
          <pt-card-content>
            <pt-stack direction="vertical" gap="lg" align="stretch">
              
              <!-- 攻撃側・防御側エリア -->
              <quiz-battle-card 
                [attackType]="attackType()" 
                [pokemon]="pokemon">
              </quiz-battle-card>

              <!-- 選択肢 -->
              <pt-grid [columns]="2" [smColumns]="3" gap="md">
                @for (choice of choices; track choice) {
                  <pt-radio-button
                    [value]="choice"
                    [selected]="selectedChoice() === choice"
                    [feedbackState]="getChoiceFeedbackState(choice)"
                    [disabled]="isChecked()"
                    (radioSelect)="selectChoice(choice)"
                  >
                    <pt-text variant="body-lg" weight="bold">{{ choice }}</pt-text>
                    <pt-text variant="label-xs" color="secondary">倍</pt-text>
                  </pt-radio-button>
                }
              </pt-grid>

            </pt-stack>
          </pt-card-content>
        </pt-card>
      } @else {
        <!-- ローディング状態 -->
        <pt-surface variant="ghost" class="loading-placeholder"></pt-surface>
      }
    </pt-surface>
  `,
  styles: [`
    .quiz-container {
      max-width: 36rem;
      margin-inline: auto;
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

  selectedChoice = signal<number | null>(null);
  isChecked = signal(false);
  isCorrect = signal(false);
  actualEffectiveness = signal<number>(1);

  /** 次の問題（事前準備） */
  private nextPokemon: Pokemon | null = null;
  private nextAttackType: PokemonType | null = null;

  constructor(private pokemonService: PokemonService) { }

  async ngOnInit() {
    await this.loadNext();
    this.showCurrentQuestion();
    // 最初の問題を表示したら、次の問題を準備
    this.prepareNextQuestion();
  }

  /**
   * 次の問題データを読み込む
   */
  private async loadNext(): Promise<void> {
    const pokemon = await this.pokemonService.getRandomPokemon();
    const randomAttackType = POKEMON_TYPES[Math.floor(Math.random() * POKEMON_TYPES.length)] as PokemonType;

    this.nextPokemon = pokemon;
    this.nextAttackType = randomAttackType;

    // 画像をプリロード
    this.pokemonService.preloadImage(pokemon);
  }

  /**
   * 現在の問題を表示（事前準備されたデータを使用）
   */
  private showCurrentQuestion(): void {
    if (!this.nextPokemon || !this.nextAttackType) return;

    this.currentPokemon.set(this.nextPokemon);
    this.attackType.set(this.nextAttackType);
    this.actualEffectiveness.set(getEffectiveness(this.nextAttackType, this.nextPokemon.types));

    this.selectedChoice.set(null);
    this.isChecked.set(false);
    this.isCorrect.set(false);
  }

  /**
   * 次の問題を事前に準備（バックグラウンド）
   */
  private async prepareNextQuestion(): Promise<void> {
    await this.loadNext();
  }

  /**
   * 次の問題へ進む
   */
  async next(): Promise<void> {
    this.showCurrentQuestion();
    // 表示したら次の問題を準備
    this.prepareNextQuestion();
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
    return result;
  }
}
