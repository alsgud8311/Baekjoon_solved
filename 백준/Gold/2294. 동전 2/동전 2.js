const [inf, ...rest] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let [n, k] = inf.split(" ").map(Number);
const coins = rest.map(Number);

const dpTable = Array(k + 1).fill(Infinity);
dpTable[0] = 0;

for (const coin of coins) {
  for (let i = coin; i <= k; i++) {
    dpTable[i] = Math.min(dpTable[i], dpTable[i - coin] + 1);
  }
}

console.log(dpTable[k] === Infinity ? -1 : dpTable[k]);
