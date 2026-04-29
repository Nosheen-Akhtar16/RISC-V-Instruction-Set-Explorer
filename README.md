RISC-V Instruction Set Explorer
This project is a comprehensive tool developed for the Linux Foundation Mentorship (LFX) Coding Challenge. It provides automated parsing, cross-referencing, and visualization of the RISC-V instruction set and its extensions by bridging data between the RISC-V Extensions Landscape and the official ISA Manual.

🚀 Key Features
Tier 1: Instruction Set Parsing
Automated Grouping: Parses instr_dict.json to categorize instructions by extension tags.

Multi-Extension Detection: Identifies and lists instructions that overlap across multiple extensions to ensure architectural clarity.

Formatted Reporting: Generates a summary table with instruction counts and mnemonic examples (e.g., rv_zba | 4 instructions | e.g. SH1ADD).

Tier 2: ISA Manual Cross-Reference
Smart Normalization: Implements a robust normalization engine to reconcile naming differences between JSON tags (e.g., rv_zba) and Manual signatures (e.g., Zba).

Deep Scan: Automatically clones the riscv-isa-manual and performs a recursive scan of .adoc source files to verify the existence of extensions.

Gap Analysis: Reports matched extensions, those missing from the manual, and those documented but not yet in the instruction dictionary.

Tier 3: Bonus & Visualization
Unit Testing: Includes a validation suite for parsing and normalization logic to ensure data integrity.

Relationship Mapping: Generates an interactive visual graph (map.html) showing shared instructions between extensions using Viz.js.

Distribution Analysis: Provides a visual donut chart (graph.html) for extension instruction density using Chart.js.

🛠️ Installation & Usage
Prerequisites
Node.js (v16.x or higher recommended)

Git (for cloning the ISA manual)

Setup
Clone this repository:

Bash
git clone <your-repo-link>
cd riscv-instruction-explorer
Install dependencies:

Bash
npm install
Running the Program
To run the full pipeline (Tier 1, Tier 2, and Bonus):

Bash
node riscv_explorer_full.js
🧪 Technical Assumptions & Design Decisions
Normalization Logic: Assumed a standard mapping where rv_ or rv32/64_ prefixes are stripped and capitalized (e.g., rv_i → I, rv_zba → Zba) to match the AsciiDoc conventions.

Manual Scanning: Limited the .adoc scan to specific directories (src/, priv/, etc.) to optimize performance while ensuring core ISA coverage.

Graph Logic: Extensions are connected in the graph if they share at least one common instruction, highlighting the modular but overlapping nature of RISC-V.

📊 Sample Output
Plaintext
=== Extension Summary ===
rv_i                 | 40    instructions | e.g. ADDI
rv_zba               | 4     instructions | e.g. SH1ADD
...
TIER 2: 42 matched, 3 in JSON only, 5 in manual only
✅ Visual graph saved as "map.html"
👩‍💻 About the Author
Nosheen Akhtar

2nd Year B.Tech CSE Student at IGDTUW.

Open Source Contributor (GSSoC '25) with experience in MERN stack, C++, and IoT.

Passionate about low-level systems and high-precision architecture.
