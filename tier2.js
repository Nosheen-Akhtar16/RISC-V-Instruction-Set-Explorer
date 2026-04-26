// riscv_tier2_and_bonus_with_htmlgraph.js

const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const execPromise = promisify(exec);
const fsSync = require('fs'); // for sync write of HTML

// --------------------------------------------------------------
// 1. Normalize extension names
// --------------------------------------------------------------
function normalizeExtension(name) {
    let n = name.toLowerCase();
    n = n.replace(/^rv(32|64)?_/, '');
    if (n === 'i') return 'I';
    if (n === 'm') return 'M';
    if (n === 'a') return 'A';
    if (n === 'f') return 'F';
    if (n === 'd') return 'D';
    if (n === 'c') return 'C';
    if (n === 'v') return 'V';
    if (n === 'q') return 'Q';
    if (n === 'h') return 'H';
    if (n === 's') return 'S';
    if (n === 'u') return 'U';
    if (n.startsWith('z')) return 'Z' + n.slice(1);
    return n.toUpperCase();
}

// 2. Load JSON and extract normalized extensions (no printing)
async function loadExtensions() {
    const url = 'https://raw.githubusercontent.com/rpsene/riscv-extensions-landscape/main/src/instr_dict.json';
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const instrDict = await res.json();
    const extSet = new Set();
    for (const [mnemonic, details] of Object.entries(instrDict)) {
        const exts = details.extension || [];
        for (const ext of exts) {
            extSet.add(normalizeExtension(ext));
        }
    }
    return { extSet, instrDict };
}

// 3. Clone / update ISA manual
async function getManual() {
    const dir = 'riscv-isa-manual';
    try {
        await fs.access(dir);
        console.log(`Updating existing manual in ${dir}...`);
        await execPromise(`git -C ${dir} pull`);
    } catch {
        console.log(`Cloning RISC-V ISA manual into ${dir}...`);
        await execPromise(`git clone --depth 1 https://github.com/riscv/riscv-isa-manual.git ${dir}`);
    }
    return dir;
}

// 4. Scan manual for extension names (improved filtering)
async function scanManual(manualDir) {
    const found = new Set();
    const skip = new Set(['The','This','Section','Figure','Table','Chapter','Appendix','Example','Note','Zero','Zeros']);
    const singleAllowed = new Set(['I','M','A','F','D','C','V','Q','H','S','U']);
    // Real extension patterns: Z followed by 2-4 lowercase letters (e.g., Zba, Zvbb, Zknh)
    // Also allow Z with numbers? Some like Zvbc? That's 4 letters. We'll allow length 2-5.
    async function walk(dir) {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        for (const e of entries) {
            const full = path.join(dir, e.name);
            if (e.isDirectory()) {
                if (['src', 'priv', 'profiles', 'example'].includes(e.name)) {
                    await walk(full);
                }
                continue;
            }
            if (e.isFile() && e.name.endsWith('.adoc')) {
                const content = await fs.readFile(full, 'utf8');
                const words = content.split(/\s+/);
                for (let w of words) {
                    let clean = w.replace(/[^A-Za-z0-9]/g, '');
                    if (clean.length === 0) continue;
                    if (skip.has(clean)) continue;
                    if (clean.match(/^Z[A-Za-z0-9]{2,5}$/)) {  // only Z extensions with 2-5 chars after Z
                        found.add(normalizeExtension(clean));
                    } else if (clean.length === 1 && singleAllowed.has(clean)) {
                        found.add(clean);
                    }
                }
            }
        }
    }
    await walk(manualDir);
    console.log(`Found ${found.size} unique extension names in manual.`);
    return found;
}

// 5. Compare and print Tier 2 results
function compareAndPrint(jsonExts, manualExts) {
    const jsonSet = new Set(jsonExts);
    const manualSet = new Set(manualExts);
    const matched = [...jsonSet].filter(e => manualSet.has(e));
    const onlyJson = [...jsonSet].filter(e => !manualSet.has(e));
    const onlyManual = [...manualSet].filter(e => !jsonSet.has(e));
    console.log('\n' + '='.repeat(60));
    console.log('TIER 2: Cross-Reference with ISA Manual');
    console.log('='.repeat(60));
    console.log(`${matched.length} matched, ${onlyJson.length} in JSON only, ${onlyManual.length} in manual only`);
    if (onlyJson.length) {
        console.log('\nExtensions present in JSON but NOT in manual (first 10):');
        console.log(onlyJson.slice(0,10).join(', '));
    }
    if (onlyManual.length) {
        console.log('\nExtensions present in manual but NOT in JSON (first 10):');
        console.log(onlyManual.slice(0,10).join(', '));
    }
}

// 6. Bonus: Unit tests
function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('Bonus – Unit Tests');
    console.log('='.repeat(60));
    let pass = 0, fail = 0;
    const assert = (cond, msg) => {
        if (cond) { console.log(`✓ ${msg}`); pass++; }
        else { console.error(`✗ ${msg}`); fail++; }
    };
    assert(normalizeExtension('rv64_zba') === 'Zba', 'normalize rv64_zba → Zba');
    assert(normalizeExtension('rv_i') === 'I', 'normalize rv_i → I');
    assert(normalizeExtension('ZBA') === 'Zba', 'normalize ZBA → Zba');
    const mock = {
        a: { extension: ['rv_i'] },
        b: { extension: ['rv_i'] },
        c: { extension: ['rv64_zba', 'rv64_zbb'] }
    };
    const groups = new Map();
    for (const [m, d] of Object.entries(mock)) {
        for (const e of (d.extension || [])) {
            const n = normalizeExtension(e);
            if (!groups.has(n)) groups.set(n, []);
            groups.get(n).push(m);
        }
    }
    assert(groups.get('I').length === 2, 'I group has 2 instructions');
    assert(groups.get('Zba').length === 1, 'Zba group has 1 instruction');
    const multi = [];
    for (const [m, d] of Object.entries(mock)) {
        if ((d.extension || []).length > 1) multi.push(m);
    }
    assert(multi.length === 1, 'Found instruction with multiple extensions');
    console.log(`\nTests: ${pass} passed, ${fail} failed`);
}

// 7. Bonus: Build graph edges and create HTML file
function buildGraphEdges(instrDict) {
    const extToInstr = new Map();
    for (const [mnemonic, details] of Object.entries(instrDict)) {
        const exts = details.extension || [];
        if (exts.length < 2) continue;
        const normExts = exts.map(normalizeExtension);
        for (const e of normExts) {
            if (!extToInstr.has(e)) extToInstr.set(e, new Set());
            extToInstr.get(e).add(mnemonic);
        }
    }
    const extList = [...extToInstr.keys()];
    const edges = [];
    for (let i = 0; i < extList.length; i++) {
        for (let j = i+1; j < extList.length; j++) {
            const a = extList[i], b = extList[j];
            for (const instr of extToInstr.get(a)) {
                if (extToInstr.get(b).has(instr)) {
                    edges.push([a, b]);
                    break;
                }
            }
        }
    }
    return edges;
}

function createGraphHtml(edges) {
    // Build DOT source
    let dot = 'graph G {\n';
    dot += '  layout=neato;\n';
    dot += '  node [shape=box, style=filled, fillcolor=lightblue];\n';
    const seen = new Set();
    for (const [a, b] of edges) {
        const key = `${a}--${b}`;
        if (!seen.has(key)) {
            dot += `  "${a}" -- "${b}";\n`;
            seen.add(key);
        }
    }
    dot += '}';

    const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>RISC-V Extensions Sharing Instructions</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; text-align: center; }
        #graph { margin-top: 20px; border: 1px solid #ccc; background: #f9f9f9; padding: 20px; }
        a { color: #3498db; }
        .info { margin: 20px; }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/viz.js/2.1.2/viz.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/viz.js/2.1.2/full.render.js"></script>
</head>
<body>
    <h1>RISC-V Extensions That Share Instructions</h1>
    <p class="info">Each connection (edge) means the two extensions appear together in at least one instruction.</p>
    <div id="graph"></div>
    <p class="info">Generated by RISC-V Instruction Set Explorer (Tier 2 + Bonus)</p>
    <script>
        var viz = new Viz();
        var dot = ${JSON.stringify(dot)};
        viz.renderSVGElement(dot).then(function(element) {
            document.getElementById('graph').appendChild(element);
        }).catch(function(error) {
            console.error(error);
            document.getElementById('graph').innerHTML = '<p style="color:red">Error rendering graph: ' + error + '</p>';
        });
    </script>
</body>
</html>`;
    return html;
}

// --------------------------------------------------------------
// MAIN
// --------------------------------------------------------------
async function main() {
    try {
        console.log('Loading instruction dictionary...');
        const { extSet: jsonExts, instrDict } = await loadExtensions();
        console.log(`Loaded ${jsonExts.size} unique extensions from JSON.`);

        const manualDir = await getManual();
        const manualExts = await scanManual(manualDir);
        compareAndPrint([...jsonExts], [...manualExts]);

        const edges = buildGraphEdges(instrDict);
        console.log('\n' + '='.repeat(60));
        console.log('Bonus – Extensions Sharing Instructions (Text)');
        console.log('='.repeat(60));
        if (edges.length === 0) {
            console.log('No shared instructions found.');
        } else {
            for (const [a, b] of edges) {
                console.log(`${a} <-> ${b}`);
            }
        }

        // Generate HTML graph
        const html = createGraphHtml(edges);
        fsSync.writeFileSync('map.html', html);
        console.log('\n✅ Visual graph saved as "map.html". Open this file in your browser to see the interactive graph.');

        runTests();
    } catch (err) {
        console.error('Fatal error:', err.message);
        process.exit(1);
    }
}

main();