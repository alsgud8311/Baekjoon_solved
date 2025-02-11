const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const [f, ...maps] = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

const [n, m] = f.split(" ").map(Number);
const maze = maps.map((m) => Array.from(m));
const visited = Array.from({ length: n }, () => new Array(m).fill(false));
const dLoc = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

function bfs() {
  const queue = [[0, 0, 1]];
  visited[0][0] = true;

  while (queue.length) {
    const [x, y, cnt] = queue.shift();
    if (x === n - 1 && y === m - 1) {
      console.log(cnt);
      return;
    }

    for (const [dx, dy] of dLoc) {
      const nx = x + dx;
      const ny = y + dy;
      if (
        nx >= 0 &&
        nx < n &&
        ny >= 0 &&
        ny < m &&
        !visited[nx][ny] &&
        maze[nx][ny] === "1"
      ) {
        visited[nx][ny] = true;
        queue.push([nx, ny, cnt + 1]);
      }
    }
  }
}

bfs();
