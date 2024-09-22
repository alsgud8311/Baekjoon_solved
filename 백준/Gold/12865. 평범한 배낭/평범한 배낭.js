let input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const [N, K] = input[0].split(" ").map(Number);
const stuffs = input.slice(1).map((line) => line.split(" ").map(Number));

const dp = Array(K + 1).fill(0);

for (let i = 0; i < N; i++) {
  const [w, v] = stuffs[i];

  for (let j = K; j >= w; j--) {
    dp[j] = Math.max(dp[j], dp[j - w] + v);
  }
}

console.log(dp[K]);
