const inputs = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const a = +inputs[0];
const sequence = inputs[1].split(" ").map(Number);
const dpTable = [...sequence];
dpTable[0] = sequence[0];

for (let i = 1; i < a; i++) {
  for (let j = 0; j < i; j++) {
    if (sequence[i] > sequence[j]) {
      dpTable[i] = Math.max(dpTable[j] + sequence[i], dpTable[i]);
    }
  }
}

console.log(Math.max(...dpTable));
