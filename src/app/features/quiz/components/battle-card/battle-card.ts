import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '@domain/pokemon.schema';
import { PokemonType, POKEMON_TYPES_MAP } from '@domain/type-chart';
import { TypeChipComponent } from '@ui/pt-type-chip/pt-type-chip';
import { AvatarComponent } from '@ui/pt-avatar/pt-avatar';
import { IconComponent } from '@ui/pt-icon/pt-icon';
import { StackComponent } from '@ui/pt-stack/pt-stack';
import { SurfaceComponent } from '@ui/pt-surface/pt-surface';
import { TextComponent } from '@ui/pt-text/pt-text';
import { AssetPathService } from '@app/core/services/asset-path.service';

/**
 * Quiz画面のバトルカード（攻撃側・防御側エリア）
 * 
 * Presentational (Dumb) コンポーネント。
 * 攻撃タイプと防御ポケモンの情報を受け取り、表示のみを担当する。
 */
@Component({
	selector: 'quiz-battle-card',
	standalone: true,
	imports: [
		CommonModule,
		TypeChipComponent,
		AvatarComponent,
		IconComponent,
		StackComponent,
		SurfaceComponent,
		TextComponent,
	],
	templateUrl: './battle-card.html',
	styleUrl: './battle-card.scss',
})
export class BattleCardComponent {
	private readonly assetPath = inject(AssetPathService);

	/** 攻撃側のタイプ */
	@Input({ required: true }) attackType!: PokemonType;

	/** 防御側のポケモン */
	@Input({ required: true }) pokemon!: Pokemon;

	/** タイプ名の日本語マップ */
	protected readonly typeMap = POKEMON_TYPES_MAP;

	/** Get arrow icon path */
	get arrowIconPath(): string {
		return this.assetPath.icon('arrow-right-double');
	}
}
