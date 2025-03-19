const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const [N, d, k, c] = inputs[0].split(" ").map(Number);
const sushi = inputs.slice(1).map(Number);

let max = 0;
let current = new Array(d + 1).fill(0);
let count = 0;

for (let i = 0; i < k; i++) {
  if (current[sushi[i]] === 0) count++;
  current[sushi[i]]++;
}

max = count;

for (let i = 0; i < N; i++) {
  if (max <= count) {
    if (current[c] === 0) max = count + 1;
    else max = count;
  }

  current[sushi[i]]--;
  if (current[sushi[i]] === 0) count--;

  const next = sushi[(i + k) % N];
  if (current[next] === 0) count++;
  current[next]++;
}

console.log(max);
