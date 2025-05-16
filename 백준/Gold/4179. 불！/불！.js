const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

const [r, c] = inputs[0].split(" ").map(Number);
const maze = inputs.slice(1).map((line) => Array.from(line));

const fireTime = Array.from({ length: r }, () => Array(c).fill(Infinity));
const jihunTime = Array.from({ length: r }, () => Array(c).fill(0));
const fireQ = [];
let jihunQ = [];

for (let i = 0; i < r; i++) {
  for (let j = 0; j < c; j++) {
    if (maze[i][j] === "F") {
      fireQ.push([i, j]);
      fireTime[i][j] = 1;
    }
    if (maze[i][j] === "J") {
      jihunQ.push([i, j]);
      jihunTime[i][j] = 1;
    }
  }
}

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

// 1. 불의 도달 시간 BFS
let fq = 0;
while (fq < fireQ.length) {
  const [x, y] = fireQ[fq++];
  for (let d = 0; d < 4; d++) {
    const nx = x + dx[d];
    const ny = y + dy[d];
    if (nx < 0 || nx >= r || ny < 0 || ny >= c) continue;
    if (maze[nx][ny] === "#") continue;
    if (fireTime[nx][ny] > fireTime[x][y] + 1) {
      fireTime[nx][ny] = fireTime[x][y] + 1;
      fireQ.push([nx, ny]);
    }
  }
}

// 2. 지훈이 이동 BFS
let jq = 0;
while (jq < jihunQ.length) {
  const [x, y] = jihunQ[jq++];
  // 탈출 조건: 가장자리
  if (x === 0 || x === r - 1 || y === 0 || y === c - 1) {
    console.log(jihunTime[x][y]);
    process.exit(0);
  }
  for (let d = 0; d < 4; d++) {
    const nx = x + dx[d];
    const ny = y + dy[d];
    if (nx < 0 || nx >= r || ny < 0 || ny >= c) continue;
    if (maze[nx][ny] === "#") continue;
    if (jihunTime[nx][ny] > 0) continue;
    // 불보다 먼저 도착할 수 있는 칸만 이동
    if (fireTime[nx][ny] <= jihunTime[x][y] + 1) continue;
    jihunTime[nx][ny] = jihunTime[x][y] + 1;
    jihunQ.push([nx, ny]);
  }
}
console.log("IMPOSSIBLE");
