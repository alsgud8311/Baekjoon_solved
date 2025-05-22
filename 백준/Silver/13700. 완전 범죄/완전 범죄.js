const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

const [N, S, D, F, B, K] = inputs[0].split(" ").map(Number);
let police;
if (inputs[1]) {
  police = new Set(inputs[1].split(" ").map(Number));
} else {
  police = new Set();
}

const visited = Array(N + 1).fill(false);
const d = Array(N + 1).fill(Infinity);
const directions = [F, -B];

const q = [[S, 0]];
visited[S] = true;
d[S] = 0;

while (q.length >= 1) {
  const [curr, sec] = q.shift();

  for (const move of directions) {
    const next = curr + move;
    if (next < 1 || next > N) continue;
    if (police.has(next) || visited[next]) continue;

    d[next] = Math.min(sec + 1, d[next]);
    visited[next] = true;
    q.push([next, sec + 1]);
  }
}

console.log(d[D] === Infinity ? "BUG FOUND" : d[D]);
