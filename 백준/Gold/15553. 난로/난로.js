const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

let [n, k] = inputs[0].split(" ").map(Number);
const times = inputs.slice(1).map(Number);

const gaps = [];
let totalTime = times[n - 1] + 1 - times[0];

for (let i = 1; i < n; i++) {
  gaps.push(times[i] - times[i - 1] - 1);
}

gaps.sort((a, b) => b - a);

for (let i = 0; i < k - 1; i++) {
  totalTime -= gaps[i];
}

console.log(totalTime);
