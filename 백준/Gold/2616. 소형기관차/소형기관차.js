const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const n = +inputs[0];
const trains = inputs[1].split(" ").map(Number);
const trainLimit = +inputs[2];

const dp = Array.from({ length: 4 }, () =>
  Array.from({ length: n + 1 }, () => 0)
);

const sum = [0];
for (let i = 1; i <= n; i++) {
  sum.push(sum[i - 1] + trains[i - 1]);
}

for (let i = 1; i <= 3; i++) {
  for (let j = trainLimit; j <= n; j++) {
    dp[i][j] = Math.max(
      dp[i][j - 1],
      dp[i - 1][j - trainLimit] + sum[j] - sum[j - trainLimit]
    );
  }
}
console.log(dp[3][n]);
