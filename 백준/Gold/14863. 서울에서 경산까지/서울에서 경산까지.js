const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const [N, K] = inputs[0].split(" ").map(Number);
const info = inputs.slice(1).map((line) => line.split(" ").map(Number));

const dp = Array.from({ length: N }, () => Array(K + 1).fill(0));

dp[0][info[0][0]] = info[0][1];
dp[0][info[0][2]] = Math.max(dp[0][info[0][2]], info[0][3]);

for (let i = 1; i < N; i++) {
  const [roadTime, roadFuel, bikeTime, bikeFuel] = info[i];
  const minTime = Math.min(roadTime, bikeTime);

  for (let j = 0; j + minTime <= K; j++) {
    if (dp[i - 1][j]) {
      const tempRt = j + roadTime;
      const tempRf = dp[i - 1][j] + roadFuel;
      const tempBt = j + bikeTime;
      const tempBf = dp[i - 1][j] + bikeFuel;

      if (tempRt <= K) {
        dp[i][tempRt] = Math.max(dp[i][tempRt], tempRf);
      }
      if (tempBt <= K) {
        dp[i][tempBt] = Math.max(dp[i][tempBt], tempBf);
      }
    }
  }
}

console.log(Math.max(...dp[N - 1]));
