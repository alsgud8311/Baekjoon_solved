const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const [A, B, C, K] = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const cost = [A, B, C];
const dir = [3, 1, 2];
const dp = new Array(K + 1);

for (let i = 0; i <= K; i++) {
  dp[i] = new Array(4).fill(Infinity);
}
dp[0][0] = 0;

for (let i = 0; i <= K; i++) {
  for (let j = 0; j < 4; j++) {
    if (dp[i][j] === Infinity) continue;

    for (let c = 0; c < 3; c++) {
      const nextEnergy = i + cost[c];
      if (nextEnergy > K) continue;

      const nextDirection = (j + dir[c]) % 4;
      dp[nextEnergy][nextDirection] = Math.min(
        dp[nextEnergy][nextDirection],
        dp[i][j] + 1
      );
    }
  }
}

console.log(dp[K][0] === Infinity ? -1 : dp[K][0]);
