# 🚀 RISC-V Instruction Set Explorer

**An automated tool for Instruction Set Analysis, Cross-Referencing, and Visual Relationship Mapping.**

This project was developed for the **Linux Foundation Mentorship (LFX) Coding Challenge**. It automates the extraction of RISC-V instructions and validates them by cross-referencing the RISC-V Extensions Landscape with the official AsciiDoc ISA Manual.

---

## 📑 Project Features

### **Tier 1: Instruction Set Parsing**
* **Hierarchical Grouping:** Parses `instr_dict.json` to categorize instructions by their extension tags.
* **Overlap Detection:** Identifies instructions that belong to multiple extensions.
* **Automated Summary:** Generates a formatted table showing extension tags, instruction counts, and example mnemonics.

### **Tier 2: ISA Manual Cross-Reference**
* **Dynamic Normalization:** Implements a robust engine to reconcile naming mismatches between JSON data (e.g., `rv_zba`) and Manual source files (e.g., `Zba`).
* **Source Scanning:** Automatically clones the `riscv-isa-manual` and performs a recursive scan of `.adoc` files to verify extension mentions.
* **Comparison Report:** Provides a detailed count of matched extensions and identifies data gaps between the two sources.

### **Tier 3: Advanced Visualization & Testing**
* **Relationship Graph:** Generates `map.html`, an interactive visual graph showing extensions linked by shared instructions (powered by Viz.js).
* **Data Distribution:** Produces `graph.html`, a donut chart visualizing instruction density across extensions (powered by Chart.js).
* **Unit Suite:** Includes integrated tests to validate normalization and parsing logic.

---

## ⚙️ Technical Stack

* **Runtime:** Node.js (v18+)
* **Languages:** JavaScript (ES6+)
* **Visualization:** Viz.js (Graphviz), Chart.js
* **Documentation Parsing:** AsciiDoc (.adoc)

---

## 🚀 Getting Started

### **1. Installation**
```bash
git clone https://github.com/Nosheen-Akhtar16/RISC-V-Instruction-Set-Explorer/tree/main
cd riscv-instruction-explorer
npm install

### **2. Run the Full Analysis Pipeline**
To execute all Tiers (1, 2, and Bonus) and generate reports:
```bash
node main.js
node tier2.js

### **3. Viewing the Outputs**
CLI Report: View the summary table and cross-reference statistics in your terminal.

graph.html: Open in a browser to see the instruction distribution chart.

map.html: Open in a browser to explore the extension relationship graph.

Samajh gaya! Tu ise seedha copy karke apne README.md file mein daal sakti hai. Maine format ko ekdum professional rakha hai aur technical terms (Taxonomy) ko LFX ke level ke hisaab se set kar diya hai.

Markdown
# 🚀 RISC-V Instruction Set Explorer

**An automated tool for Instruction Set Analysis, Cross-Referencing, and Visual Relationship Mapping.**

This project was developed for the **Linux Foundation Mentorship (LFX) Coding Challenge**. It provides a high-performance automated pipeline to extract RISC-V instructions and validate them against the official AsciiDoc ISA Manual, bridging the gap between raw data and formal documentation.

---

## 📑 Project Features in Detail

### **Tier 1: Instruction Set Parsing & Analysis**
* **Hierarchical Grouping:** Processes `instr_dict.json` to categorize hundreds of instructions into their respective extension clusters (e.g., `rv_i`, `rv_zba`, `rv_v`).
* **Overlap Identification:** Implements a tracking algorithm to detect instructions that are shared across multiple extensions, ensuring architectural transparency.
* **Automated Summary Generation:** Produces a clean, formatted CLI table displaying extension tags, total instruction density, and representative mnemonics for quick verification.

### **Tier 2: ISA Manual Cross-Reference (The Validation Engine)**
* **Automated Workspace Sync:** Integrated Git workflow to clone or pull the latest `riscv-isa-manual` directly from the official RISC-V GitHub repository.
* **Semantic Normalization Engine:** A custom-built mapping logic that reconciles the naming discrepancies between JSON-based tags (e.g., `rv_zba`) and human-readable manual signatures (e.g., `Zba`, `Zicsr`).
* **Recursive AsciiDoc Scanner:** A deep-scan utility that traverses the `src/` directory of the manual, parsing `.adoc` files to verify the existence of every extension mentioned in the landscape.
* **Gap Analysis Reporting:** Generates a statistical summary of matched extensions, orphaned JSON tags, and undocumented signatures found in the manual.

### **Tier 3: Advanced Visualization & Testing (Bonus)**
* **Relationship Mapping (`map.html`):** An interactive graph visualizing the architectural "links" between extensions that share common instructions, powered by **Viz.js (Graphviz)**.
* **Instruction Density Chart (`graph.html`):** A high-level donut chart showing the distribution of instructions across the top extensions, powered by **Chart.js**.
* **Unit Testing Suite:** Integrated tests using assertion logic to validate the normalization engine and ensure parsing accuracy across edge cases.

---

## ⚙️ Technical Stack & Dependencies

* **Runtime Environment:** Node.js (v18.x or higher)
* **Primary Language:** JavaScript (ES6+)
* **External Libraries:** Viz.js (for SVG Rendering), Chart.js (for Data Visualization)
* **Data Sources:** RISC-V Extensions Landscape & Official RISC-V ISA Manual (AsciiDoc)

---

## 🚀 Installation & Execution Guide

### **1. Clone the Repository**
```bash
git clone <your-repository-url>
cd riscv-instruction-explorer
```
## **2. Install Dependencies**
### **1. Clone the Repository**
```bash
git clone <your-repository-url>
cd riscv-instruction-explorer
```Bash
npm install ```
## **3. Run the Full Analysis Pipeline**
To execute all Tiers (1, 2, and Bonus) and generate reports:

```Bash
node main.js ```

## **4. Viewing the Outputs**
CLI Report: View the summary table and cross-reference statistics in your terminal.

graph.html: Open in a browser to see the instruction distribution chart.

map.html: Open in a browser to explore the extension relationship graph.

## **🛠️ Engineering Design Decisions**
**Normalization Philosophy:** Implemented a regex-based normalizer to strip architectural bit-widths (rv32/rv64) and standardize prefixes, ensuring rv_zba and Zba are correctly matched.

**Performance Optimization:** The script uses a recursive walker to scan the manual's source, specifically targeting .adoc files in the src/ directory to ensure high accuracy with minimal overhead.

**Graph Logic:** The relationship graph revealed modular dependencies by drawing logical "edges" between extensions that share identical instruction mnemonics.
