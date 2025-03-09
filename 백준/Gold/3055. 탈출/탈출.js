const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const [R, C] = inputs[0].split(" ").map(Number);
const board = inputs.slice(1).map((str) => str.split(""));
const dLoc = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
let queue = [];
let water = [];
for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (board[i][j] === "S") {
      queue.push([i, j, 0]);
    } else if (board[i][j] === "*") {
      water.push([i, j]);
    }
  }
}

while (queue.length) {
  const newWater = [];
  //   console.log(water);
  for (let i = 0; i < water.length; i++) {
    const [r, c] = water[i];
    for (const [dr, dc] of dLoc) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
      if (board[nr][nc] === ".") {
        board[nr][nc] = "*";
        newWater.push([nr, nc]);
      }
    }
  }
  water = [...newWater];

  const newQueue = [];
  for (let i = 0; i < queue.length; i++) {
    const [r, c, min] = queue[i];
    for (const [dr, dc] of dLoc) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;

      if (board[nr][nc] === "D") {
        console.log(min + 1);
        process.exit();
      }
      if (board[nr][nc] === ".") {
        board[nr][nc] = min + 1;
        newQueue.push([nr, nc, min + 1]);
      }
    }
  }
  queue = [...newQueue];
}

console.log("KAKTUS");
