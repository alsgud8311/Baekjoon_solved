const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "inputs.txt";
const [n, k] = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const dp = Array.from({ length: n + 1 }, () => Infinity);
dp[0] = 0;

for (let i = 0; i < n; i++) {
  if (i + 1 <= n) dp[i + 1] = Math.min(dp[i + 1], dp[i] + 1);
  if (i + Math.floor(i / 2) <= n)
    dp[i + Math.floor(i / 2)] = Math.min(
      dp[i] + 1,
      dp[i + Math.floor(i / 2)] + 1
    );
}

dp[n] <= k ? console.log("minigimbob") : console.log("water");
