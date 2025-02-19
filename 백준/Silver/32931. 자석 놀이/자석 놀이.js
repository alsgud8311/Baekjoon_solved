const fs = require("fs");
const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const [N, ...lines] = fs.readFileSync(INPUT_FILE).toString().trim().split("\n");

const n = Number(N);
const grid = lines.map((line) => line.split(" ").map(Number));

const dp = Array.from({ length: 2 }, () => new Array(n).fill(0));

dp[0][0] = Math.max(grid[0][0], grid[0][0] + grid[1][0]);
dp[1][0] = grid[0][0] + grid[1][0];

for (let j = 1; j < n; j++) {
  let topVal = grid[0][j];
  let botVal = grid[1][j];

  let cand1 = dp[0][j - 1] + topVal;
  let cand2 = dp[0][j - 1] + topVal + botVal;
  let cand3 = dp[1][j - 1] + topVal + botVal;
  dp[0][j] = Math.max(cand1, cand2, cand3);

  cand1 = dp[1][j - 1] + botVal;
  cand2 = dp[1][j - 1] + topVal + botVal;
  cand3 = dp[0][j - 1] + topVal + botVal;
  dp[1][j] = Math.max(cand1, cand2, cand3);
}

console.log(dp[1][n - 1]);
