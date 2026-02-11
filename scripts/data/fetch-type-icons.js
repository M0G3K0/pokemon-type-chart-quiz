/**
 * Pokemon Type Icons Fetcher & Processor
 * 
 * ============================================================================
 * SOURCE
 * ============================================================================
 * Original icons from: https://github.com/partywhale/pokemon-type-icons
 * These are recreations of type icons from Brilliant Diamond, Shining Pearl,
 * Legends: Arceus, Scarlet, and Violet (MIT License).
 * 
 * Raw URL pattern:
 *   https://raw.githubusercontent.com/partywhale/pokemon-type-icons/main/icons/{type}.svg
 * 
 * ============================================================================
 * WHAT THIS SCRIPT DOES
 * ============================================================================
 * 1. Fetch original SVGs from GitHub
 * 2. Remove background circle elements (r="128")
 * 3. Identify "white" classes (silhouette) vs "colored" classes (internal details)
 * 4. Convert all to white (#fff) or transparent
 * 
 * ============================================================================
 * LIMITATION: SCRIPT CANNOT CREATE "HOLES" AUTOMATICALLY
 * ============================================================================
 * The script's automatic processing does NOT work correctly for icons that
 * have internal details (eyes, patterns, etc.) that should appear as "holes"
 * (transparent areas showing the background through the icon).
 * 
 * AFFECTED ICONS (require manual fix):
 *   - normal (center circle)
 *   - water (wave pattern inside droplet)
 *   - ice (inner detail in snowflake)
 *   - psychic (inner star pattern)
 *   - ghost (two eyes)
 *   - dragon (two eyes)
 *   - steel (two small circles)
 *   - fairy (inner pattern)
 * 
 * ============================================================================
 * MANUAL FIX: Using fill-rule="evenodd" to create holes
 * ============================================================================
 * To create proper holes in SVG, you need to:
 * 
 * 1. Combine ALL paths (outer silhouette + inner details) into ONE <path> element
 * 2. Add fill-rule="evenodd" attribute to the path
 * 3. Separate path data with spaces (each sub-path creates a hole)
 * 
 * Example (normal.svg):
 *   BEFORE (two separate paths - inner circle appears solid):
 *     <path fill="#fff" d="M129.76,204.09...Z"/>
 *     <path fill="#fff" d="M77.28,133.16...Z"/>
 * 
 *   AFTER (one combined path with evenodd - inner circle becomes transparent hole):
 *     <path fill="#fff" fill-rule="evenodd" d="M129.76,204.09...Z M77.28,133.16...Z"/>
 * 
 * The evenodd rule makes overlapping regions alternate between filled and empty,
 * creating the hole effect.
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// All 18 Pokemon types
const TYPES = [
	'normal', 'fire', 'water', 'electric', 'grass', 'ice',
	'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
	'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

const BASE_URL = 'https://raw.githubusercontent.com/partywhale/pokemon-type-icons/main/icons';
const OUTPUT_DIR = path.join(__dirname, '..', '..', 'public', 'icons');

/**
 * Fetch SVG content from URL
 */
function fetchSvg(url) {
	return new Promise((resolve, reject) => {
		https.get(url, (res) => {
			if (res.statusCode !== 200) {
				reject(new Error(`Failed to fetch ${url}: ${res.statusCode}`));
				return;
			}
			let data = '';
			res.on('data', chunk => data += chunk);
			res.on('end', () => resolve(data));
		}).on('error', reject);
	});
}

/**
 * Check if a hex color is "white-ish" (high brightness)
 */
function isWhiteColor(hexColor) {
	if (!hexColor) return false;

	// Remove # and normalize to 6-digit hex
	let hex = hexColor.replace('#', '');

	// Convert 3-digit hex to 6-digit
	if (hex.length === 3) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}

	const r = parseInt(hex.substr(0, 2), 16);
	const g = parseInt(hex.substr(2, 2), 16);
	const b = parseInt(hex.substr(4, 2), 16);

	console.log(`    Color check: ${hexColor} -> RGB(${r}, ${g}, ${b})`);

	// Check if it's close to white (all channels > 240)
	return r > 240 && g > 240 && b > 240;
}


/**
 * Extract class definitions from SVG style block
 * Returns a map of className -> fillColor
 */
function extractClassColors(svgContent) {
	const classColors = {};

	// Match style definitions like ".cls-1 { fill: #fff; }"
	const styleMatch = svgContent.match(/<style>([\s\S]*?)<\/style>/);
	if (!styleMatch) return classColors;

	const styleContent = styleMatch[1];

	// Match each class definition
	const classRegex = /\.(cls-\d+)\s*\{[^}]*fill:\s*(#[0-9a-fA-F]{3,6});?[^}]*\}/g;
	let match;
	while ((match = classRegex.exec(styleContent)) !== null) {
		classColors[match[1]] = match[2];
	}

	return classColors;
}

/**
 * Process SVG to create white silhouette version with transparent holes
 * 
 * Strategy:
 * 1. Remove background <circle> elements (r="128")
 * 2. Identify "white" classes (silhouette) and "colored" classes (internal details)
 * 3. White classes stay white, colored classes become transparent (holes)
 */
function processSvgToWhite(svgContent, typeName) {
	let processed = svgContent;

	// Remove background circle (r="128" is the full-size background)
	processed = processed.replace(/<circle[^>]*r="128"[^>]*\/>/g, '');

	// Extract class colors to identify which are white (silhouette) vs colored (details)
	const classColors = extractClassColors(svgContent);
	console.log(`  Classes found: ${JSON.stringify(classColors)}`);

	// Process each class based on its original color
	for (const [className, color] of Object.entries(classColors)) {
		const isWhite = isWhiteColor(color);
		const newColor = isWhite ? '#fff' : 'transparent';

		// Replace the fill color for this class
		const classRegex = new RegExp(
			`(\\.${className}\\s*\\{[^}]*?)fill:\\s*#[0-9a-fA-F]{3,6};?`,
			'g'
		);
		processed = processed.replace(classRegex, `$1fill: ${newColor};`);

		console.log(`  ${className}: ${color} -> ${newColor} (${isWhite ? 'silhouette' : 'hole'})`);
	}

	// Clean up any duplicate whitespace
	processed = processed.replace(/\n\s*\n\s*\n/g, '\n\n');

	// Ensure proper XML declaration and encoding
	if (!processed.startsWith('<?xml')) {
		processed = '<?xml version="1.0" encoding="UTF-8"?>\n' + processed;
	}

	return processed;
}

/**
 * Main execution
 */
async function main() {
	console.log('🔄 Fetching and processing Pokemon type icons...\n');

	// Ensure output directory exists
	if (!fs.existsSync(OUTPUT_DIR)) {
		fs.mkdirSync(OUTPUT_DIR, { recursive: true });
	}

	const results = { success: [], failed: [] };

	for (const type of TYPES) {
		const url = `${BASE_URL}/${type}.svg`;
		const outputPath = path.join(OUTPUT_DIR, `${type}.svg`);

		try {
			console.log(`📥 Fetching ${type}...`);
			const originalSvg = await fetchSvg(url);

			console.log(`⚙️  Processing ${type}...`);
			const processedSvg = processSvgToWhite(originalSvg, type);

			// Write processed SVG
			fs.writeFileSync(outputPath, processedSvg, 'utf8');
			console.log(`✅ Saved ${type}.svg\n`);
			results.success.push(type);

		} catch (error) {
			console.error(`❌ Failed to process ${type}: ${error.message}\n`);
			results.failed.push({ type, error: error.message });
		}
	}

	// Summary
	console.log('\n' + '='.repeat(50));
	console.log('📊 Summary');
	console.log('='.repeat(50));
	console.log(`✅ Successfully processed: ${results.success.length}/${TYPES.length}`);

	if (results.failed.length > 0) {
		console.log(`❌ Failed: ${results.failed.map(f => f.type).join(', ')}`);
	}

	console.log(`\n📁 Output directory: ${OUTPUT_DIR}`);
}

main().catch(console.error);
