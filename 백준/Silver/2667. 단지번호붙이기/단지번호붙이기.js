const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const [n, ...m] = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const N = +n;
const houseMap = m.map((h) => Array.from(h).map(Number));
const dLoc = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];
const result = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (houseMap[i][j]) {
      result.push(bfs(i, j));
    }
  }
}
console.log(result.length);
console.log(result.sort((a, b) => a - b).join("\n"));

function dfs(x, y) {
  houseMap[x][y] = 0;
  let count = 1;
  for (const [dx, dy] of dLoc) {
    if (
      x + dx >= 0 &&
      x + dx < N &&
      y + dy >= 0 &&
      y + dy < N &&
      houseMap[x + dx][y + dy]
    ) {
      count += dfs(x + dx, y + dy);
    }
  }
  return count;
}

function bfs(x, y) {
  let count = 1;
  const queue = [[x, y]];
  houseMap[x][y] = 0;

  while (queue.length) {
    const [cx, cy] = queue.shift();
    for (const [dx, dy] of dLoc) {
      const nx = cx + dx,
        ny = cy + dy;
      if (nx >= 0 && nx < N && ny >= 0 && ny < N && houseMap[nx][ny]) {
        houseMap[nx][ny] = 0;
        queue.push([nx, ny]);
        count++;
      }
    }
  }
  return count;
}
