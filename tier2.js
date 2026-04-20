const fs = require("fs");
const path = require("path");

// ==============================
// STEP 1: JSON extensions
// ==============================
const data = JSON.parse(fs.readFileSync("instr_dict.json", "utf-8"));

const jsonExt = new Set();

for (const instruction in data) {
    const details = data[instruction];
    if (!details || !details.extension) continue;

    const extensions = details.extension;
    if (!Array.isArray(extensions)) continue;

    extensions.forEach(ext => {
        let clean = ext
            .replace(/^rv(32|64)?_/, "")   // remove rv, rv32, rv64
            .toUpperCase();

        // split combined extensions
        clean.split("_").forEach(e => {
            if (!e) return;

            // ✅ base extensions
            if (["I","M","A","F","D","C","V","Q","H"].includes(e)) {
                jsonExt.add(e);
                return;
            }

            // ✅ Z extensions
            if (e.startsWith("Z")) {
                jsonExt.add(e);
            }
        });
    });
}

// ==============================
// STEP 2: ISA manual scan
// ==============================
const manualPath = "./riscv-isa-manual/src";
const manualExt = new Set();

function scanFiles(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);

        if (fs.statSync(fullPath).isDirectory()) {
            scanFiles(fullPath);
        } else if (file.endsWith(".adoc")) {

            const content = fs.readFileSync(fullPath, "utf-8");

            // match possible extensions
            const matches = content.match(/\b(Z[a-zA-Z0-9]+|[IMAFDCVQH])\b/g);

            if (matches) {
                matches.forEach(m => {
                    let clean = m.toUpperCase();

                    // ❌ filter noise words
                    if (clean.length > 15) return;
                    if (["ZERO", "ZEROED", "ZHANG", "ZANDIJK", "ZABROCKI"].includes(clean)) return;

                    // ✅ valid extension format
                    if (/^(Z[A-Z0-9]+|[IMAFDCVQH])$/.test(clean)) {
                        manualExt.add(clean);
                    }
                });
            }
        }
    });
}

scanFiles(manualPath);

// ==============================
// STEP 3: Compare
// ==============================
const jsonOnly = [...jsonExt].filter(x => !manualExt.has(x));
const manualOnly = [...manualExt].filter(x => !jsonExt.has(x));
const matched = [...jsonExt].filter(x => manualExt.has(x));

// ==============================
// STEP 4: Output
// ==============================
console.log("\n=== CROSS REFERENCE RESULT ===\n");

console.log("Matched Extensions:", matched.length);
console.log("Only in JSON:", jsonOnly.length);
console.log("Only in Manual:", manualOnly.length);

console.log("\n--- JSON ONLY ---");
console.log(jsonOnly.slice(0, 10));

console.log("\n--- MANUAL ONLY ---");
console.log(manualOnly.slice(0, 10));

// ==============================
// DEBUG (optional but useful)
// ==============================
console.log("\nCheck base extensions:");
console.log("JSON has I?", jsonExt.has("I"));
console.log("Manual has I?", manualExt.has("I"));