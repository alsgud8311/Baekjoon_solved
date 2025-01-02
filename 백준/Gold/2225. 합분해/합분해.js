const [n, k] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .split(" ")
  .map(Number);

const dpTable = Array.from({ length: k + 2 }, () => Array(n + 1).fill(1));

for (let i = 2; i <= k + 1; i++) {
  for (let j = 1; j <= n + 1; j++) {
    dpTable[i][j] = (dpTable[i - 1][j] + dpTable[i][j - 1]) % 1000000000;
  }
}

console.log(dpTable[k][n]);
