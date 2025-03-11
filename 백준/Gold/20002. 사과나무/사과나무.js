const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
let sum = -Infinity;
const n = +inputs[0];
const trees = inputs.slice(1).map((t) => t.split(" ").map(Number));

const prefixSum = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    prefixSum[i][j] =
      trees[i - 1][j - 1] +
      prefixSum[i - 1][j] +
      prefixSum[i][j - 1] -
      prefixSum[i - 1][j - 1];
  }
}

for (let size = 1; size <= n; size++) {
  for (let i = size; i <= n; i++) {
    for (let j = size; j <= n; j++) {
      const temp =
        prefixSum[i][j] -
        prefixSum[i - size][j] -
        prefixSum[i][j - size] +
        prefixSum[i - size][j - size];
      sum = Math.max(sum, temp);
    }
  }
}

console.log(sum);
