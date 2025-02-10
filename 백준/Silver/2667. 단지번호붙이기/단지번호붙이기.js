const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const [n, ...m] = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const N = +n;
const houseMap = m.map((h) => Array.from(h).map(Number));
const dLoc = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];
let houses = 0;
const result = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (houseMap[i][j]) {
      dfs(i, j);
      result.push(houses);
      houses = 0;
    }
  }
}
console.log(result.length);
console.log(result.sort((a, b) => a - b).join("\n"));

function dfs(x, y, count = 0) {
  houseMap[x][y] = 0;
  houses++;
  for (const [dx, dy] of dLoc) {
    if (
      x + dx >= 0 &&
      x + dx < N &&
      y + dy >= 0 &&
      y + dy < N &&
      houseMap[x + dx][y + dy]
    ) {
      dfs(x + dx, y + dy, count + 1);
    }
  }
}
