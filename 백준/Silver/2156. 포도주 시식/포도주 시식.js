const inputs = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = +inputs[0];
const wines = [0, ...inputs.slice(1).map(Number)];
const dpTable = Array(n + 1).fill(0);

if (n <= 2) {
  if (n === 1) console.log(wines[1]);
  if (n === 2) console.log(wines[1] + wines[2]);
} else {
  dpTable[1] = wines[1];
  dpTable[2] = dpTable[1] + wines[2];
  for (let i = 3; i <= n; i++) {
    dpTable[i] = Math.max(
      dpTable[i - 3] + wines[i - 1] + wines[i],
      dpTable[i - 2] + wines[i],
      dpTable[i - 1]
    );
  }
  console.log(dpTable[n]);
}
