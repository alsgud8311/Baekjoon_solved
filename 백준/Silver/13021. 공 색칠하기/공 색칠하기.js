const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const [n, m] = inputs[0].split(" ").map(Number);
const balls = new Array(n + 1).fill(-1);
const ballPaints = inputs.slice(1).map((b) => b.split(" ").map(Number));

ballPaints.forEach(([l, r], i) => {
  for (let j = l; j <= r; j++) {
    balls[j] = i;
  }
});

let cnt = 0;

let group = {};
for (let i = 1; i <= n; i++) {
  if (balls[i] !== balls[i - 1] && balls[i] >= 0) {
    if (group[balls[i]]) {
      continue;
    } else {
      cnt++;
      group[balls[i]] = 1;
    }
  }
}
console.log(Math.pow(2, cnt));
