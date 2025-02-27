const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

const n = +inputs[0];
const sheet = [0, ...inputs[1].split(" ").map(Number)];
const questions = inputs.slice(3).map((q) => q.split(" ").map(Number));
const dp = new Array(n + 1).fill(0);

let acc = 1;
for (let i = n - 1; i > 0; i--) {
  if (sheet[i] > sheet[i + 1]) {
    dp[i] += acc;
    acc++;
  } else {
    dp[i] = acc - 1;
  }
}

let result = "";
for (const [x, y] of questions) {
  result += `${dp[x] - dp[y]}\n`;
}
console.log(result);
