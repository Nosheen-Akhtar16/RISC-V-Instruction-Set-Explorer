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

# 🚀 RISC-V Instruction Set Explorer

An automated tool for **Instruction Set Analysis, Cross-Referencing, and Visual Relationship Mapping**.

---

## 📦 Installation & Execution Guide

### 1. Clone the Repository

```bash
git clone https://github.com/Nosheen-Akhtar16/RISC-V-Instruction-Set-Explorer.git
cd RISC-V-Instruction-Set-Explorer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Analysis Pipeline

Execute all tiers (Tier 1, Tier 2, Bonus):

```bash
node main.js
```

---

## 📊 Outputs

* **CLI Report**
  Displays extension summary and cross-reference results in terminal.

* **graph.html**
  Open in browser → shows instruction distribution (Donut Chart).

* **map.html**
  Open in browser → interactive graph of extension relationships.

---

## ⚙️ Engineering Design Decisions

* **Normalization Strategy**
  Regex-based normalization to remove prefixes like `rv32_`, `rv64_` and standardize extensions.

* **Performance Optimization**
  Recursive directory scanning for ISA manual parsing.

* **Graph Logic**
  Extensions are connected if they share at least one instruction.

---

## 🧪 Bonus Features

* ✅ Cross-referencing with official RISC-V ISA manual
* ✅ Multi-extension detection
* ✅ Unit tests for validation
* ✅ Interactive graph visualization

---

## 📌 Tech Stack

* Node.js
* JavaScript (ES6)
* Chart.js
* Viz.js (Graph Visualization)

---

## 👩‍💻 Author

**Nosheen Akhtar**

---

## 📄 License

MIT License
