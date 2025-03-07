const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const [n, ...w] = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const dp = new Array(500).fill(1);
const wires = w.map((w) => w.split(" ").map(Number));
wires.sort((a, b) => a[0] - b[0]);

for (let i = 1; i < n; i++) {
  for (let j = 0; j < i; j++) {
    if (wires[i][1] > wires[j][1]) {
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
}
console.log(n - Math.max(...dp));
