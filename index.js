const fs = require("fs");
//JSON read
if (!fs.existsSync("instr_dict.json")) {
    console.log("oops, no file");
    process.exit(1);
}
const data = JSON.parse(fs.readFileSync("instr_dict.json", "utf-8"));

//extension map and  multi-ext
const extMap = {};
const multiExt = [];

for (const instruction in data) {
    const details = data[instruction];

    if (!details || !details.extension) continue;

    const extensions = details.extension;

    if (!Array.isArray(extensions) || extensions.length === 0) continue;

    // do multi extension check 
    if (extensions.length > 1) {
        multiExt.push({ instruction, extensions });
    }

    // grouping
    extensions.forEach(ext => {
        if (!extMap[ext]) {
            extMap[ext] = new Set();
        }
        extMap[ext].add(instruction);
    });
}

// Sort
const sorted = Object.entries(extMap).sort((a, b) => {
    if (b[1].size !== a[1].size) {
        return b[1].size - a[1].size;
    }
    return a[0].localeCompare(b[0]);
});

// print summary
console.log("\n=== Extension Summary ===\n");

sorted.forEach(([ext, instrSet]) => {
    const instructions = Array.from(instrSet);
    const count = instructions.length;
    const example = instructions[0];

    console.log(
        ext.padEnd(20),
        "|",
        String(count).padEnd(5),
        "instructions | e.g.",
        example
    );
});

// Correct totals
console.log("\nTotal Extensions:", sorted.length);

//  Correct unique instruction count
const totalUniqueInstructions = Object.keys(data).length;
console.log("Total Unique Instructions:", totalUniqueInstructions);

// multi-extension output
console.log("\n=== Instructions with Multiple Extensions ===\n");

multiExt.slice(0, 5).forEach(item => {
    console.log(`${item.instruction} → ${item.extensions.join(", ")}`);
});

console.log(`\nTotal Multi-Extension Instructions: ${multiExt.length}`);



const labels = [];
const counts = [];

let others = 0;

sorted.forEach(([ext, instrSet], index) => {
    if (index < 2) {
        labels.push(ext);
        counts.push(instrSet.size);
    } else {
        others += instrSet.size;
    }
});

labels.push("Others");
counts.push(others);
// HTML generate
const html = `
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body style="font-family: Arial; text-align: center;">

  <h2>Top Extensions Distribution (Donut Chart)</h2>
  <canvas id="myChart" width="400" height="400"></canvas>

  <script>
    const labels = ${JSON.stringify(labels)};
    const counts = ${JSON.stringify(counts)};

    new Chart(document.getElementById('myChart'), {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: counts,
          backgroundColor: [
            '#73a774',
            '#2195f3de',
            '#dfab12'
          ]
        }]
      },
      options: {
        responsive: true,
        cutout: '35%',
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  </script>

</body>
</html>
`;
fs.writeFileSync("graph.html", html);
console.log("✅ Donut chart created: graph.html");