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
git clone <[your-repository-url](https://github.com/Nosheen-Akhtar16/RISC-V-Instruction-Set-Explorer/tree/main)>
cd riscv-instruction-explorer
npm install
