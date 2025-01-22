const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const k = +inputs[0];
const c = inputs[1].split(" ").map(Number);
let max = 0;
for (let i = 0; i < k - 1; i++) {
  for (let j = i; j < k; j++) {
    let temp = getMaxSubsequenceLength(c.slice(i + 1), c[j] - c[i], c[j]);
    max = Math.max(temp, max);
  }
}
console.log(max);

function getMaxSubsequenceLength(arr, diff, start) {
  let max = 2;
  let curr = start;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] - curr === diff) {
      max++;
      curr = arr[i];
    }
  }
  return max;
}
