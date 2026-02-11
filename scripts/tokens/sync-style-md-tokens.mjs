/**
 * NgDoc style.md Token Table Auto-Sync (v2: Convention over Configuration)
 *
 * @what  Tier 3 JSONからstyle.mdのトークンテーブルを自動生成する
 * @why   トークン変更時にNgDocドキュメントの手動更新漏れを防ぐ
 * @failure  style.mdのトークンテーブルがトークンJSONと不整合になることを防止
 *
 * v2 変更点:
 *   - COMPONENT_TABLE_CONFIGS / rowMapper を廃止
 *   - JSON構造を再帰走査して自動でテーブルを推論
 *   - マーカーは1つだけ: <!-- @auto-generated:token-table:start/end -->
 *   - 全コンポーネントを自動検出（Tier 3 JSON があれば処理）
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../..');

const TOKENS_DIR = path.join(PROJECT_ROOT, 'design-tokens/tier3-component');
const DOCS_DIRS = [
    path.join(PROJECT_ROOT, 'projects/docs/src/components'),
    path.join(PROJECT_ROOT, 'projects/docs/src/poke-sdk'),
];

const START_MARKER = '<!-- @auto-generated:token-table:start -->';
const END_MARKER = '<!-- @auto-generated:token-table:end -->';

// ============================================================================
// JSON → Markdown テーブル自動推論
// ============================================================================

/**
 * ノードがリーフ（トークン定義）かどうかを判定
 * リーフ = { value: ..., type: ... } を持つオブジェクト
 */
function isLeaf(node) {
    return (
        node &&
        typeof node === 'object' &&
        'value' in node &&
        'type' in node &&
        typeof node.value !== 'object'
    );
}

/**
 * camelCase → kebab-case 変換
 * 例: fontFamily → font-family, borderWidth → border-width, lineHeight → line-height
 */
function camelToKebab(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * CSS変数名を生成: --pt-{component}-{path parts joined by -}
 * JSONキーのcamelCaseをkebab-caseに変換（Style Dictionaryの出力と一致させる）
 */
function cssVarName(component, pathParts) {
    return `--pt-${component}-${pathParts.map(camelToKebab).join('-')}`;
}

/**
 * value を表示用にフォーマット
 *   - {xxx.yyy} 形式 → そのまま（参照）
 *   - それ以外 → 直値
 */
function formatValue(value) {
    if (value === undefined || value === null) return '';
    const str = String(value);
    return str;
}

/**
 * $description から「CSSプロパティ名」を抽出
 * 例: "ボタンの背景色。`background-color`に適用。" → "background-color"
 */
function extractCssProp(desc) {
    if (!desc) return '';
    const match = desc.match(/`([a-z-]+)`に適用/);
    return match ? match[1] : '';
}

/**
 * JSON を再帰走査し、テーブルセクションを収集する
 *
 * 戦略:
 *   1. 子がすべてリーフ → 1つのテーブル（各子が1行）
 *   2. 子がすべてグループで、各グループの子構成が同じ → サイズバリアントテーブル
 *   3. 子が混在 or 異なる構造 → 各子を再帰
 *
 * @param {object} node - 現在のJSONノード
 * @param {string} component - コンポーネント名（CSS変数プレフィックス）
 * @param {string[]} currentPath - 現在のパス
 * @param {string} sectionTitle - セクションタイトル
 * @returns {Array<{title: string, markdown: string}>}
 */
function collectTables(node, component, currentPath = [], sectionTitle = '') {
    if (!node || typeof node !== 'object') return [];

    const childKeys = Object.keys(node).filter((k) => !k.startsWith('$'));
    if (childKeys.length === 0) return [];

    // 全子要素を分類
    const leafChildren = {};
    const groupChildren = {};

    for (const key of childKeys) {
        const child = node[key];
        if (isLeaf(child)) {
            leafChildren[key] = child;
        } else if (child && typeof child === 'object') {
            groupChildren[key] = child;
        }
    }

    const leafKeys = Object.keys(leafChildren);
    const groupKeys = Object.keys(groupChildren);

    const tables = [];

    // ケース1: 全子がリーフ → フラットテーブル
    if (leafKeys.length > 0 && groupKeys.length === 0) {
        const title = sectionTitle || pathToTitle(currentPath);
        tables.push({
            title: `### ${title}`,
            markdown: generateFlatTable(leafChildren, component, currentPath),
        });
        return tables;
    }

    // ケース2: 全子がグループ → サイズバリアントテーブルの可能性
    if (leafKeys.length === 0 && groupKeys.length > 0) {
        // 各グループの子構成が同じか確認（サイズバリアントパターン）
        if (isVariantPattern(groupChildren)) {
            const title = sectionTitle || pathToTitle(currentPath);
            tables.push({
                title: `### ${title}`,
                markdown: generateVariantTable(groupChildren, component, currentPath),
            });
            return tables;
        }

        // 異なる構造 → 各子を再帰
        for (const key of groupKeys) {
            const childTitle = pathToTitle([...currentPath, key]);
            const sub = collectTables(groupChildren[key], component, [...currentPath, key], childTitle);
            tables.push(...sub);
        }
        return tables;
    }

    // ケース3: 混在 → リーフだけのテーブル + グループを再帰
    if (leafKeys.length > 0) {
        const title = sectionTitle || pathToTitle(currentPath);
        tables.push({
            title: `### ${title}`,
            markdown: generateFlatTable(leafChildren, component, currentPath),
        });
    }
    for (const key of groupKeys) {
        const childTitle = pathToTitle([...currentPath, key]);
        const sub = collectTables(groupChildren[key], component, [...currentPath, key], childTitle);
        tables.push(...sub);
    }
    return tables;
}

/**
 * パスからセクションタイトルを生成
 * 例: ['padding', 'x'] → "Padding X"
 */
function pathToTitle(parts) {
    if (parts.length === 0) return 'Tokens';
    return parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
}

/**
 * サイズバリアントパターン かどうか判定
 * 条件: 各グループの直下の子キー構成が（$除き）おおよそ同じ
 */
function isVariantPattern(groups) {
    const keys = Object.keys(groups);
    if (keys.length < 2) return false;

    // 各グループの子キー（リーフのみ）を取得
    const childKeysList = keys.map((k) => {
        const child = groups[k];
        if (!child || typeof child !== 'object') return [];
        return Object.keys(child)
            .filter((ck) => !ck.startsWith('$') && isLeaf(child[ck]))
            .sort();
    });

    // 全グループの子キーが同一か
    const first = JSON.stringify(childKeysList[0]);
    return childKeysList.every((ks) => JSON.stringify(ks) === first);
}

// ============================================================================
// テーブル生成
// ============================================================================

/**
 * フラットテーブル: リーフ群 → Markdown テーブル
 * | Key | Token | Value | Description |
 */
function generateFlatTable(leaves, component, parentPath) {
    const keys = Object.keys(leaves);
    const lines = [];

    // 列構成を決定
    const hasRef = keys.some((k) => String(leaves[k].value).startsWith('{'));
    const hasDesc = keys.some((k) => leaves[k].$description);

    const columns = ['Key', 'Token'];
    if (hasRef) columns.push('Reference');
    columns.push('Value');
    if (hasDesc) columns.push('Description');

    lines.push(`| ${columns.join(' | ')} |`);
    lines.push(`|${columns.map(() => '------').join('|')}|`);

    for (const key of keys) {
        const token = leaves[key];
        const varName = cssVarName(component, [...parentPath, key]);
        const value = formatValue(token.value);
        const isRef = String(value).startsWith('{');

        const cells = [`\`${key}\``, `\`${varName}\``];
        if (hasRef) cells.push(isRef ? `\`${value}\`` : '');
        cells.push(isRef ? extractDirectValue(token) : `${value}`);
        if (hasDesc) cells.push(token.$description || '');

        lines.push(`| ${cells.join(' | ')} |`);
    }

    return lines.join('\n');
}

/**
 * $description や value から直値を推定
 */
function extractDirectValue(token) {
    if (!token) return '';
    // $descriptionからpx値
    if (token.$description) {
        const match = token.$description.match(/(\d+(?:\.\d+)?px)/);
        if (match) return match[1];
    }
    // 参照でないならvalue そのもの
    if (!String(token.value).startsWith('{')) return String(token.value);
    return '';
}

/**
 * バリアントテーブル: 同構造のグループ群 → クロステーブル
 * 例: padding.x = { sm: {value}, md: {value} } → Size | Token | Value
 */
function generateVariantTable(groups, component, parentPath) {
    const variantKeys = Object.keys(groups);
    const firstGroup = groups[variantKeys[0]];
    const propKeys = Object.keys(firstGroup).filter(
        (k) => !k.startsWith('$') && isLeaf(firstGroup[k])
    );

    const lines = [];

    // 列構成: Variant | property1 Token | property2 Token | ...
    if (propKeys.length === 1) {
        // 単一プロパティ → シンプルテーブル
        const columns = ['Variant', 'Token', 'Value', 'Description'];
        lines.push(`| ${columns.join(' | ')} |`);
        lines.push(`|${columns.map(() => '------').join('|')}|`);

        for (const variant of variantKeys) {
            const token = groups[variant][propKeys[0]];
            if (!isLeaf(token)) continue;
            const varName = cssVarName(component, [...parentPath, variant, propKeys[0]]);
            const value = formatValue(token.value);
            const desc = token.$description || '';
            lines.push(`| \`${variant}\` | \`${varName}\` | ${value} | ${desc} |`);
        }
    } else {
        // 複数プロパティ → 各プロパティの列
        const columns = ['Variant', ...propKeys.map((p) => p.charAt(0).toUpperCase() + p.slice(1))];
        lines.push(`| ${columns.join(' | ')} |`);
        lines.push(`|${columns.map(() => '------').join('|')}|`);

        for (const variant of variantKeys) {
            const cells = [`\`${variant}\``];
            for (const prop of propKeys) {
                const token = groups[variant][prop];
                if (isLeaf(token)) {
                    const varName = cssVarName(component, [...parentPath, variant, prop]);
                    cells.push(`\`${varName}\``);
                } else {
                    cells.push('');
                }
            }
            lines.push(`| ${cells.join(' | ')} |`);
        }
    }

    return lines.join('\n');
}

// ============================================================================
// style.md マーカー置換
// ============================================================================

/**
 * style.md 内の統合マーカー間を置換
 */
function replaceMarkerContent(content, newContent) {
    const startIdx = content.indexOf(START_MARKER);
    const endIdx = content.indexOf(END_MARKER);

    if (startIdx === -1 || endIdx === -1) {
        return { content, replaced: false };
    }

    const before = content.substring(0, startIdx + START_MARKER.length);
    const after = content.substring(endIdx);

    return {
        content: `${before}\n${newContent}\n${after}`,
        replaced: true,
    };
}

// ============================================================================
// コンポーネント自動検出 & docs ディレクトリ名マッピング
// ============================================================================

/**
 * Tier 3 JSON ファイル名からdocsディレクトリ名を推定
 * JSON rootKey はキャメルケース（radioButton）、docs は kebab-case（radio-button）
 */
function jsonNameToDocsDir(jsonBaseName) {
    // JSONファイル名がそのまま docs ディレクトリ名
    return jsonBaseName;
}

/**
 * JSON の root key を取得
 */
function getRootKey(jsonData) {
    return Object.keys(jsonData).find((k) => !k.startsWith('$'));
}

// ============================================================================
// Main
// ============================================================================

console.log('\n🔄 Syncing token tables to style.md...\n');

let hasError = false;
let updatedCount = 0;
let skippedCount = 0;

// Tier 3 JSON を自動検出
const jsonFiles = fs.readdirSync(TOKENS_DIR).filter((f) => f.endsWith('.json'));

for (const jsonFile of jsonFiles) {
    const baseName = jsonFile.replace('.json', '');
    const docsDir = jsonNameToDocsDir(baseName);
    const tokenFilePath = path.join(TOKENS_DIR, jsonFile);

    // 複数の docs ディレクトリから style.md を検索
    let styleMdPath = null;
    for (const docsRoot of DOCS_DIRS) {
        const candidate = path.join(docsRoot, docsDir, 'style.md');
        if (fs.existsSync(candidate)) {
            styleMdPath = candidate;
            break;
        }
    }

    if (!styleMdPath) {
        console.log(`  ⏭️  No style.md: ${docsDir}/`);
        skippedCount++;
        continue;
    }

    const jsonData = JSON.parse(fs.readFileSync(tokenFilePath, 'utf8'));
    const rootKey = getRootKey(jsonData);
    if (!rootKey) {
        console.warn(`  ⚠️  No root key found in ${jsonFile}`);
        continue;
    }

    const rootObj = jsonData[rootKey];
    const component = baseName; // CSS変数のプレフィックス

    // テーブルを自動生成
    const tables = collectTables(rootObj, component);
    if (tables.length === 0) {
        console.log(`  ⏭️  No tables generated: ${docsDir}/`);
        skippedCount++;
        continue;
    }

    // 全テーブルを結合
    const allTablesContent = tables.map((t) => `${t.title}\n\n${t.markdown}`).join('\n\n');

    // style.md を読み込んでマーカー置換
    let styleMd = fs.readFileSync(styleMdPath, 'utf8');

    const result = replaceMarkerContent(styleMd, allTablesContent);
    if (!result.replaced) {
        console.log(`  ⏭️  No markers in: ${docsDir}/style.md`);
        skippedCount++;
        continue;
    }

    // 変更あれば書き出し
    if (styleMd !== result.content) {
        fs.writeFileSync(styleMdPath, result.content, 'utf8');
        console.log(`  ✅ Updated: ${docsDir}/style.md (${tables.length} table(s))`);
        updatedCount++;
    } else {
        console.log(`  ⏭️  No changes: ${docsDir}/style.md`);
    }
}

if (hasError) {
    console.error('\n❌ Some sync operations failed.');
    process.exit(1);
} else {
    console.log(
        `\n✅ Token table sync completed. (${updatedCount} updated, ${skippedCount} skipped)`
    );
}
