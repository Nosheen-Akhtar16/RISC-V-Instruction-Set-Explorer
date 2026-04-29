Markdown
# 🚀 RISC-V Instruction Set Explorer

**An automated tool for Instruction Set Analysis, Cross-Referencing, and Visual Relationship Mapping.**

This project was developed for the **Linux Foundation Mentorship (LFX) Coding Challenge**. It provides a high-performance automated pipeline to extract RISC-V instructions and validate them against the official AsciiDoc ISA Manual, bridging the gap between raw data and formal documentation.

---

## 📑 Project Features in Detail

### **Tier 1: Instruction Set Parsing & Analysis**
* **Hierarchical Grouping:** Processes `instr_dict.json` to categorize hundreds of instructions into their respective extension clusters (e.g., `rv_i`, `rv_zba`, `rv_v`).
* **Overlap Identification:** Implements a tracking algorithm to detect instructions that are shared across multiple extensions, ensuring architectural transparency.
* **Automated Summary Generation:** Produces a clean, formatted CLI table displaying extension tags, total instruction density, and representative mnemonics.

### **Tier 2: ISA Manual Cross-Reference (The Validation Engine)**
* **Automated Workspace Sync:** Integrated Git workflow to clone or pull the latest `riscv-isa-manual` directly from the official RISC-V GitHub repository.
* **Semantic Normalization Engine:** A custom-built mapping logic that reconciles discrepancies between JSON tags (e.g., `rv_zba`) and human-readable manual signatures (e.g., `Zba`).
* **Recursive AsciiDoc Scanner:** A deep-scan utility that traverses the `src/` directory of the manual, parsing `.adoc` files to verify extensions.
* **Gap Analysis Reporting:** Generates a statistical summary of matched extensions, orphaned JSON tags, and undocumented signatures found in the manual.

### **Tier 3: Advanced Visualization & Testing (Bonus)**
* **Relationship Mapping (`map.html`):** An interactive graph visualizing architectural "links" between extensions sharing common instructions (powered by **Viz.js**).
* **Instruction Density Chart (`graph.html`):** A high-level donut chart showing distribution across top extensions (powered by **Chart.js**).
* **Unit Testing Suite:** Integrated tests using assertion logic to validate the normalization engine and parsing accuracy.

---

## ⚙️ Technical Stack & Dependencies

* **Runtime Environment:** Node.js (v18.x or higher)
* **Primary Language:** JavaScript (ES6+)
* **External Libraries:** Viz.js (SVG Rendering), Chart.js (Data Visualization)
* **Data Sources:** RISC-V Extensions Landscape & Official RISC-V ISA Manual (AsciiDoc)

---

## 🚀 Installation & Execution Guide

### **1. Clone the Repository**
```bash
git clone [https://github.com/Nosheen-Akhtar16/RISC-V-Instruction-Set-Explorer.git](https://github.com/Nosheen-Akhtar16/RISC-V-Instruction-Set-Explorer.git)
cd RISC-V-Instruction-Set-Explorer
2. Install Dependencies
Bash
npm install
3. Run the Analysis Pipeline
To execute all Tiers (1, 2, and Bonus) and generate reports:

Bash
node main.js
4. Viewing the Outputs
CLI Report: View the summary table and cross-reference statistics in your terminal.

graph.html: Open in a browser to see the instruction distribution chart.

map.html: Open in a browser to explore the extension relationship graph.

🛠️ Engineering Design Decisions
Normalization Philosophy: Implemented a regex-based normalizer to strip architectural bit-widths (rv32/rv64) and standardize prefixes, ensuring rv_zba and Zba are correctly matched.

Performance Optimization: The script uses a recursive walker to scan the manual's source, specifically targeting .adoc files in the src/ directory to ensure high accuracy with minimal overhead.

Graph Logic: The relationship graph revealed modular dependencies by drawing logical "edges" between extensions that share identical instruction mnemonics.

👩‍💻 About the Author
Nosheen Akhtar

Education: 2nd Year B.Tech CSE Student at IGDTUW (2028).

Experience: Open Source Contributor (GSSoC '25) with a focus on Full-Stack (MERN) and IoT integration.

Philosophy: Applying the discipline of Taekwondo to write clean, resilient, and optimized code.
