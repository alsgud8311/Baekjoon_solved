const inputs = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const n = +inputs[0];
const arr = inputs[1].split(" ").map(Number);
const dpArr1 = Array(n).fill(1);
const dpArr2 = Array(n).fill(1);

for (let i = 0; i < n; i++) {
  for (let j = 0; j < i; j++) {
    if (arr[i] > arr[j] && dpArr1[i] < dpArr1[j] + 1) {
      dpArr1[i] += 1;
    }
  }
}

for (let i = n - 1; i >= 0; i--) {
  for (let j = n - 1; j > i; j--) {
    if (arr[i] > arr[j] && dpArr2[i] < dpArr2[j] + 1) {
      dpArr2[i] += 1;
    }
  }
}

let max = 0;
for (let i = 0; i < n; i++) {
  let sum = dpArr1[i] + dpArr2[i] - 1;
  max = Math.max(sum, max);
}
console.log(max);
