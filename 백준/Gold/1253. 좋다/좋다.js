const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const n = +inputs[0];
const arr = inputs[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let cnt = 0;
for (let i = 0; i < n; i++) {
  let left = 0;
  let right = n - 1;
  const target = arr[i];

  while (left < right) {
    if (left === i) {
      left++;
      continue;
    }
    if (right === i) {
      right--;
      continue;
    }

    const sum = arr[left] + arr[right];

    if (sum === target) {
      cnt++;
      break;
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
}
console.log(cnt);
