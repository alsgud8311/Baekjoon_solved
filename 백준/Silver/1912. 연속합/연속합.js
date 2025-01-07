const inputs = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const n = +inputs[0];
const sequence = inputs[1].split(" ").map(Number);
const dpArr = [...sequence];

for (let i = 1; i < n; i++) {
  dpArr[i] = Math.max(dpArr[i - 1] + sequence[i], sequence[i]);
}

console.log(Math.max(...dpArr));
