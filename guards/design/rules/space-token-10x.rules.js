/**
 * @what  spacing.json のスペーストークンキーが10倍命名規則に従っているか検査
 * @why   半端値（05, 15）と整数値（1, 2, 4...）が混在する不整合を防ぐため
 * @failure  npm run guard:space-token-10x でエラーとなり、違反箇所が表示される
 * @guardrail guards/design/guard/space-token-10x.guard.md
 */

const fs = require("fs");
const path = require("path");

const GUARDRAIL_PATH = "guards/design/guard/space-token-10x.guard.md";

// 検査対象
const PRIMITIVE_SPACING_PATH = path.join(
    __dirname,
    "../../../design-tokens/tier1-primitive/spacing.json"
);

const REFERENCE_DIRS = [
    path.join(__dirname, "../../../design-tokens/tier2-semantic"),
    path.join(__dirname, "../../../design-tokens/tier3-component"),
];

/**
 * 許可されるスペーストークンキーのパターン
 *
 * - "00"        → 0px
 * - "05"        → 2px (半端値)
 * - "15"        → 6px (半端値)
 * - "10"-"90"   → 4px-36px (10倍表記: 1桁×10)
 * - "100"-"900" → 40px-360px (10倍表記: 1桁×100)
 */
const ALLOWED_KEY_PATTERN = /^(00|05|15|[1-9]0|[1-9][0-9]0)$/;

/**
 * 参照パターン: {space.X} 形式
 */
const SPACE_REF_PATTERN = /\{space\.([^}]+)\}/g;

/**
 * Tier 1 のキーを検査
 */
function validatePrimitiveKeys() {
    if (!fs.existsSync(PRIMITIVE_SPACING_PATH)) {
        console.error(`❌ File not found: ${PRIMITIVE_SPACING_PATH}`);
        process.exit(1);
    }

    const content = JSON.parse(fs.readFileSync(PRIMITIVE_SPACING_PATH, "utf8"));
    const spaceObj = content.space;
    const errors = [];

    if (!spaceObj) {
        console.error('❌ No "space" object found in spacing.json');
        process.exit(1);
    }

    for (const key of Object.keys(spaceObj)) {
        if (key.startsWith("$")) continue; // skip $description etc.

        if (!ALLOWED_KEY_PATTERN.test(key)) {
            errors.push({
                type: "key",
                file: PRIMITIVE_SPACING_PATH,
                key,
                message: `Invalid key "space.${key}". Must follow 10x naming (e.g., 10, 20, 100).`,
            });
        }
    }

    return errors;
}

/**
 * JSON内の {space.X} 参照を検査
 */
function findJsonFiles(dir) {
    const results = [];
    if (!fs.existsSync(dir)) return results;

    for (const file of fs.readdirSync(dir)) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            results.push(...findJsonFiles(filePath));
        } else if (file.endsWith(".json")) {
            results.push(filePath);
        }
    }

    return results;
}

function validateReferences() {
    const errors = [];

    for (const dir of REFERENCE_DIRS) {
        const files = findJsonFiles(dir);

        for (const file of files) {
            const content = fs.readFileSync(file, "utf8");
            const lines = content.split("\n");

            lines.forEach((line, index) => {
                SPACE_REF_PATTERN.lastIndex = 0;
                let match;
                while ((match = SPACE_REF_PATTERN.exec(line)) !== null) {
                    const refKey = match[1];
                    if (!ALLOWED_KEY_PATTERN.test(refKey)) {
                        errors.push({
                            type: "reference",
                            file,
                            line: index + 1,
                            key: refKey,
                            message: `Invalid reference "{space.${refKey}}". Must follow 10x naming.`,
                        });
                    }
                }
            });
        }
    }

    return errors;
}

/**
 * メイン実行
 */
function main() {
    console.log("🛡️ Checking space token 10x naming convention...\n");

    const keyErrors = validatePrimitiveKeys();
    const refErrors = validateReferences();
    const allErrors = [...keyErrors, ...refErrors];

    if (allErrors.length > 0) {
        console.error("❌ Space token naming violations found:\n");

        allErrors.forEach((error) => {
            const relativePath = path.relative(process.cwd(), error.file);
            if (error.type === "key") {
                console.error(`   Key violation: space.${error.key}`);
                console.error(`   File: ${relativePath}`);
            } else {
                console.error(`   Ref violation: {space.${error.key}}`);
                console.error(`   File: ${relativePath}:${error.line}`);
            }
            console.error(`   ${error.message}\n`);
        });

        console.error(`   See: ${GUARDRAIL_PATH}`);
        console.error(`\n❌ Found ${allErrors.length} violation(s).`);
        process.exit(1);
    } else {
        console.log("✅ All space tokens follow 10x naming convention.");
        process.exit(0);
    }
}

if (require.main === module) {
    main();
}

module.exports = { validatePrimitiveKeys, validateReferences, ALLOWED_KEY_PATTERN };
