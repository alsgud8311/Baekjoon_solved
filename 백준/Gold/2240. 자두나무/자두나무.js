const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

const [t, w] = inputs[0].split(" ").map(Number);
const plums = [0, ...inputs.slice(1).map(Number)];
const dp = Array.from({ length: t + 1 }, () => new Array(w + 1).fill(0));

for (let i = 1; i <= t; i++) {
  //이동 없이 자두 받는 경우
  dp[i][0] = dp[i - 1][0] + (plums[i] === 1 ? 1 : 0);

  for (let j = 1; j <= w; j++) {
    //이동 횟수 짝수 -> 1번나무
    if (j % 2 === 0) {
      dp[i][j] =
        Math.max(dp[i - 1][j], dp[i - 1][j - 1]) + (plums[i] === 1 ? 1 : 0);
    } else {
      //이동 횟수 홀수 -> 2번 나무
      dp[i][j] =
        Math.max(dp[i - 1][j], dp[i - 1][j - 1]) + (plums[i] === 2 ? 1 : 0);
    }
  }
}

console.log(Math.max(...dp[t]));
