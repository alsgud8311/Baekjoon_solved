const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const [n, k, m] = inputs[0].split(" ").map(Number);
const kimbabs = [];
for (let i = 1; i < n + 1; i++) {
  const kb = +inputs[i];
  if (kb > 2 * k) {
    kimbabs.push(kb - 2 * k);
  } else if (2 * k > kb && kb > k) {
    kimbabs.push(kb - k);
  }
}

if (kimbabs.length === 0) {
  console.log(-1);
  process.exit(0);
}

let result = -1;
let left = 1;
let right = Math.max(...kimbabs);
while (left <= right) {
  let mid = Math.floor((left + right) / 2);
  let count = kimbabs.reduce((acc, L) => acc + Math.floor(L / mid), 0);

  if (count >= m) {
    result = mid;
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}
console.log(result);
