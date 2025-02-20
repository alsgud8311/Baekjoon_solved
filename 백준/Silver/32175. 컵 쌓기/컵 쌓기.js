const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

const [n, h] = inputs[0].split(" ").map(Number);
const cups = inputs[1].split(" ").map(Number);
const MOD = 1000000007;

const dp = new Array(h + 1).fill(0);
dp[0] = 1;

for (let i = 1; i <= h; i++) {
  for (const cup of cups) {
    if (i >= cup) {
      dp[i] = (dp[i] + dp[i - cup]) % MOD;
    }
  }
}

console.log(dp[h]);
