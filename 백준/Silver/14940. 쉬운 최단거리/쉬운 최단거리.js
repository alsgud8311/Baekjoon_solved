const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const [n, m] = inputs[0].split(" ").map(Number);
const maps = inputs.slice(1).map((row) => row.split(" "));

const dLoc = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];
const visited = Array.from({ length: n }, () => new Array(m).fill(false));
function bfs(row, col, d) {
  const queue = [[row, col, d]];
  while (queue.length) {
    const [row, col, d] = queue.shift();
    if (visited[row][col]) continue;
    visited[row][col] = true;
    maps[row][col] = d;
    for (const [dr, rc] of dLoc) {
      const nr = row + dr;
      const nc = col + rc;
      if (nr < n && nr >= 0 && nc < m && nc >= 0 && maps[nr][nc] !== "0") {
        queue.push([nr, nc, d + 1]);
      }
    }
  }
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (maps[i][j] === "2") {
      bfs(i, j, 0);
    }
  }
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (maps[i][j] === "1") maps[i][j] = -1;
  }
}

console.log(maps.map((row) => row.join(" ")).join("\n"));
