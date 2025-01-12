const inputs = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = +inputs[0];
const arr = inputs[1].split(" ").map(Number);
const dpArr = Array(n).fill(1);
for (let i = 0; i < n; i++) {
  for (let j = 0; j < i; j++) {
    if (arr[i] < arr[j]) {
      dpArr[i] = Math.max(dpArr[j] + 1, dpArr[i]);
    }
  }
}

console.log(Math.max(...dpArr));
