const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const [n, m] = inputs[0].split(" ").map(Number);
const arr = inputs[1].split(" ").map(Number);

let left = 0;
let right = Math.max(...arr);
let result = Infinity;

while (left < right) {
  let mid = Math.floor((left + right) / 2);
  if (possible(mid)) {
    if (result > mid) result = mid;
    right = mid;
  } else left = mid + 1;
}

function possible(mid) {
  let max = -Infinity;
  let min = Infinity;
  let cnt = 1;
  for (let i = 0; i < n; i++) {
    max = Math.max(max, arr[i]);
    min = Math.min(min, arr[i]);
    if (max - min > mid) {
      cnt++;
      max = arr[i];
      min = arr[i];
    }
  }
  return cnt <= m;
}
console.log(result);
