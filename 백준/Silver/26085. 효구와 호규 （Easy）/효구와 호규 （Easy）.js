const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

const [n, m] = inputs[0].split(" ").map(Number);
const cards = inputs.slice(1).map((c) => c.split(" ").map(Number));

let acc1 = 0;
let acc0 = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (cards[i][j] === 1) {
      acc1++;
    } else acc0++;
  }
}
const pos1 = acc1 % 2 === 0 && acc0 % 2 === 0;
if (!pos1) {
  console.log(-1);
  process.exit(0);
}

let possible = false;
const dLoc = [
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 0],
];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    for (const [dr, dc] of dLoc) {
      const nr = i + dr;
      const nc = j + dc;
      if (nr >= 0 && nc >= 0 && nr < n && nc < m) {
        if (cards[i][j] === cards[nr][nc]) {
          console.log(1);
          process.exit(0);
        }
      }
    }
  }
}

console.log(-1);
