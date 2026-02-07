/**
 * NgDoc style.md Token Table Auto-Sync
 *
 * @what  トークンJSONからstyle.mdのトークンテーブルを自動更新する
 * @why   トークン変更時にNgDocドキュメントの手動更新漏れを防ぐ
 * @failure  style.mdのトークンテーブルがトークンJSONと不整合になることを防止
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

const TOKENS_DIR = path.join(PROJECT_ROOT, 'design-tokens/tier3-component');
const DOCS_DIR = path.join(PROJECT_ROOT, 'projects/docs/src/components');

const START_MARKER = '<!-- @auto-generated:token-table:start -->';
const END_MARKER = '<!-- @auto-generated:token-table:end -->';

// ============================================================================
// Configuration: コンポーネントごとのテーブル定義
// ============================================================================

/**
 * @typedef {Object} TableConfig
 * @property {string} id - マーカーID（style.md内で一意）
 * @property {string} tokenPath - トークンJSON内のパス（ドット区切り）
 * @property {string[]} columns - テーブルカラム定義
 * @property {function} rowMapper - キーとトークンオブジェクトから行を生成
 */

/**
 * CSS変数名を生成（トークンパスからプレフィックス付き変数名を構築）
 */
function cssVar(component, ...parts) {
    return `\`--pt-${component}-${parts.join('-')}\``;
}

/**
 * 参照値を取得（{xxx.yyy} 形式）
 */
function refValue(token) {
    if (!token || !token.value) return '';
    return `\`${token.value}\``;
}

/**
 * $descriptionからpx値を抽出
 */
function extractPxFromDesc(token) {
    if (!token || !token.$description) return '';
    const match = token.$description.match(/(\d+px)/);
    return match ? match[1] : '';
}

/**
 * $descriptionから用途を抽出（。より前の部分）
 */
function extractUsageFromDesc(token) {
    if (!token || !token.$description) return '';
    // 最初の文は「概要 (値)。」形式が多いので、2番目以降を取得
    const parts = token.$description.split('。').filter(Boolean);
    if (parts.length > 1) return parts.slice(1).join('。').trim();
    return '';
}

// コンポーネント別テーブル設定
const COMPONENT_TABLE_CONFIGS = {
    chip: {
        tokenFile: 'chip.json',
        rootKey: 'chip',
        docsDir: 'chip',
        tables: [
            {
                id: 'size',
                title: '### Size Tokens',
                tokenPath: 'padding.x',
                columns: ['Size', 'Padding Token', 'Font Size Token'],
                rowMapper: (key, _token, rootObj) => {
                    const padding = rootObj.padding?.x?.[key];
                    const fontSize = rootObj.font?.size?.[key];
                    const padVal = padding ? extractPxFromDesc(padding) : '';
                    const fontVal = fontSize ? extractPxFromDesc(fontSize) : '';
                    return `| \`${key}\` | ${cssVar('chip', 'padding-x', key)} (${padVal}) | ${cssVar('chip', 'font-size', key)} (${fontVal}) |`;
                },
            },
            {
                id: 'radius',
                title: '### Border Radius',
                tokenPath: 'radius',
                columns: ['Rounded', 'Token', 'Value'],
                rowMapper: (key, token) => {
                    const val = token.value.startsWith('{') ? extractPxFromDesc(token) || token.value : token.value;
                    return `| \`${key}\` | ${cssVar('chip', 'radius', key)} | ${val} |`;
                },
            },
        ],
    },
    icon: {
        tokenFile: 'icon.json',
        rootKey: 'icon',
        docsDir: 'icon',
        tables: [
            {
                id: 'size',
                title: '### Size',
                tokenPath: 'size',
                columns: ['Size', 'Token (Tier 3)', 'Reference', 'Value', '用途'],
                rowMapper: (key, token) => {
                    const px = extractPxFromDesc(token);
                    const usage = extractUsageFromDesc(token);
                    return `| \`${key}\` | ${cssVar('icon', 'size', key)} | ${refValue(token)} | ${px} | ${usage} |`;
                },
            },
            {
                id: 'color',
                title: '### Color',
                tokenPath: 'color',
                columns: ['Variant', 'Token (Tier 3)', 'Reference', '用途'],
                rowMapper: (key, token) => {
                    const desc = token.$description || '';
                    return `| \`${key}\` | ${cssVar('icon', 'color', key)} | ${refValue(token)} | ${desc} |`;
                },
            },
        ],
    },
    spinner: {
        tokenFile: 'spinner.json',
        rootKey: 'spinner',
        docsDir: 'spinner',
        tables: [
            {
                id: 'size',
                title: '### Size',
                tokenPath: 'size',
                columns: ['Size', 'Token (Tier 3)', 'Value', '用途'],
                rowMapper: (key, token) => {
                    const px = extractPxFromDesc(token);
                    const usage = extractUsageFromDesc(token);
                    return `| \`${key}\` | ${cssVar('spinner', 'size', key)} | ${px} | ${usage} |`;
                },
            },
            {
                id: 'border-width',
                title: '### Border Width',
                tokenPath: 'border.width',
                columns: ['Size', 'Token (Tier 3)', 'Value'],
                rowMapper: (key, token) => {
                    return `| \`${key}\` | ${cssVar('spinner', 'border-width', key)} | ${token.value} |`;
                },
            },
            {
                id: 'color',
                title: '### Color',
                tokenPath: 'color',
                columns: ['Visual Attribute', 'Token (Tier 3)', 'Reference', '用途'],
                rowMapper: (key, token) => {
                    const desc = token.$description || '';
                    return `| ${key.charAt(0).toUpperCase() + key.slice(1)} | ${cssVar('spinner', 'color', key)} | ${refValue(token)} | ${desc} |`;
                },
            },
        ],
    },
};

// ============================================================================
// Generator Logic
// ============================================================================

function getByPath(obj, dotPath) {
    return dotPath.split('.').reduce((cur, key) => {
        if (cur && typeof cur === 'object' && key in cur) return cur[key];
        return undefined;
    }, obj);
}

function extractKeys(obj) {
    if (!obj || typeof obj !== 'object') return [];
    return Object.keys(obj).filter((k) => !k.startsWith('$'));
}

/**
 * テーブルのMarkdownを生成
 */
function generateTable(tableConfig, rootObj) {
    const tokenObj = getByPath(rootObj, tableConfig.tokenPath);
    const keys = extractKeys(tokenObj);
    if (keys.length === 0) return null;

    const lines = [];
    lines.push(tableConfig.title);
    lines.push('');

    // ヘッダー
    const header = `| ${tableConfig.columns.join(' | ')} |`;
    const separator = `|${tableConfig.columns.map(() => '------').join('|')}|`;
    lines.push(header);
    lines.push(separator);

    // 行
    for (const key of keys) {
        const token = tokenObj[key];
        lines.push(tableConfig.rowMapper(key, token, rootObj));
    }

    return lines.join('\n');
}

/**
 * style.md内のマーカー間を置換
 */
function replaceMarkerContent(content, tableId, newContent) {
    const startTag = `<!-- @auto-generated:${tableId}:start -->`;
    const endTag = `<!-- @auto-generated:${tableId}:end -->`;

    const startIdx = content.indexOf(startTag);
    const endIdx = content.indexOf(endTag);

    if (startIdx === -1 || endIdx === -1) {
        return { content, replaced: false };
    }

    const before = content.substring(0, startIdx + startTag.length);
    const after = content.substring(endIdx);

    return {
        content: `${before}\n${newContent}\n${after}`,
        replaced: true,
    };
}

// ============================================================================
// Main
// ============================================================================

console.log('\n🔄 Syncing token tables to style.md...\n');

let hasError = false;
let updatedCount = 0;

for (const [componentName, config] of Object.entries(COMPONENT_TABLE_CONFIGS)) {
    const tokenFilePath = path.join(TOKENS_DIR, config.tokenFile);
    const styleMdPath = path.join(DOCS_DIR, config.docsDir, 'style.md');

    if (!fs.existsSync(tokenFilePath)) {
        console.error(`  ❌ Token file not found: ${config.tokenFile}`);
        hasError = true;
        continue;
    }

    if (!fs.existsSync(styleMdPath)) {
        console.warn(`  ⚠️  style.md not found for ${componentName}, skipping`);
        continue;
    }

    const tokenData = JSON.parse(fs.readFileSync(tokenFilePath, 'utf8'));
    const rootObj = tokenData[config.rootKey];
    let styleMd = fs.readFileSync(styleMdPath, 'utf8');
    let anyReplaced = false;

    for (const tableConfig of config.tables) {
        const tableContent = generateTable(tableConfig, rootObj);
        if (!tableContent) continue;

        const result = replaceMarkerContent(styleMd, tableConfig.id, tableContent);
        if (result.replaced) {
            styleMd = result.content;
            anyReplaced = true;
        } else {
            console.warn(`  ⚠️  Markers for "${tableConfig.id}" not found in ${componentName}/style.md`);
        }
    }

    if (anyReplaced) {
        const original = fs.readFileSync(styleMdPath, 'utf8');
        if (original !== styleMd) {
            fs.writeFileSync(styleMdPath, styleMd, 'utf8');
            console.log(`  ✅ Updated: ${componentName}/style.md`);
            updatedCount++;
        } else {
            console.log(`  ⏭️  No changes: ${componentName}/style.md`);
        }
    }
}

if (hasError) {
    console.error('\n❌ Some sync operations failed.');
    process.exit(1);
} else {
    console.log(`\n✅ Token table sync completed. (${updatedCount} file(s) updated)`);
}
