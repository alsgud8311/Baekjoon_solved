const inputs = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = +inputs[0];
const a = inputs[1].split(" ").map(Number);
const dpTable = Array(n + 1).fill(1);

for (let i = 0; i < n; i++) {
  for (let j = 0; j < i; j++) {
    if (a[i] > a[j]) {
      dpTable[i] = Math.max(dpTable[j] + 1, dpTable[i]);
    }
  }
}
console.log(Math.max(...dpTable));
