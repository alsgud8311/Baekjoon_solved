const fs = require("fs");

const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const [n, k] = fs
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const MAX = Math.max(n, k) * 2 + 1;
const visited = new Array(MAX).fill(false);
const queue = [[n, 0]];

visited[n] = true;

while (queue.length) {
  const [to, cnt] = queue.shift();

  if (to === k) {
    console.log(cnt);
    break;
  }

  for (const next of [to + 1, to - 1, to * 2]) {
    if (next >= 0 && next < MAX && !visited[next]) {
      visited[next] = true;
      queue.push([next, cnt + 1]);
    }
  }
}
