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

for (let i = 1; i < n; i++) {
  dp[i] = dp[i - 1] + (sheet[i] > sheet[i + 1] ? 1 : 0);
}

// 🔹 O(1)로 답을 출력
let result = "";
for (const [x, y] of questions) {
  result += `${dp[y - 1] - dp[x - 1]}\n`;
}

console.log(result);
