const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

const [s, p] = inputs[0].split(" ").map(Number);
const str = inputs[1];
const [a, c, g, t] = inputs[2].split(" ").map(Number);
const testSum = a + c + g + t;

if (testSum > s) {
  console.log(0);
  process.exit(0);
}

const count = { A: 0, C: 0, G: 0, T: 0 };
let result = 0;
for (let i = 0; i < p; i++) count[str[i]]++;
if (count["A"] >= a && count["C"] >= c && count["G"] >= g && count["T"] >= t)
  result++;

for (let i = p; i < s; i++) {
  count[str[i]]++;
  count[str[i - p]]--;
  if (count["A"] >= a && count["C"] >= c && count["G"] >= g && count["T"] >= t)
    result++;
}

console.log(result);
