const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

// 다른 모든 회원과 친구 -> 1점
// 다른 모든 회원과 친구거나 친구의 친구 -> 2점
// 다른 모든 회원과 친구 | 친구의 친구 | 친구의 친구의 친구 -> 3점
const n = +inputs[0];
const friends = {};

inputs
  .slice(1, inputs.length - 1)
  .map((r) => r.split(" ").map(Number))
  .forEach(([a, b]) => {
    if (!friends[a]) {
      friends[a] = [b];
    } else {
      friends[a].push(b);
    }

    if (!friends[b]) {
      friends[b] = [a];
    } else {
      friends[b].push(a);
    }
  });

const totalScore = new Array(n + 1).fill(0);
for (let i = 1; i <= n; i++) {
  const visited = new Array(n + 1).fill(false);
  bfs(i, visited);
}

function bfs(f, visited) {
  if (!friends[f] || visited[f]) return;
  const queue = [[f, 0]];
  while (queue.length) {
    const [ff, d] = queue.shift();
    if (visited[ff] || !friends[ff]) continue;
    visited[ff] = true;
    totalScore[ff] = Math.max(totalScore[ff], d);
    friends[ff].forEach((fff) => {
      if (!visited[fff]) queue.push([fff, d + 1]);
    });
  }
}

const ss = Math.min(...totalScore.slice(1));
const sss = [];
totalScore.slice(1).forEach((a, idx) => {
  if (a === ss) sss.push(idx + 1);
});
console.log(ss, sss.length);
console.log(sss.join(" "));
