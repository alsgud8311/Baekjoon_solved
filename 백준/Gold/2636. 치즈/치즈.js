const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

const [n, m] = inputs[0].split(" ").map(Number);
const plate = inputs.slice(1).map((r) => r.split(" ").map(Number));
const dLoc = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

const visited = Array.from({ length: n }, () => new Array(m).fill(false));
const noCheeseArr = Array.from({ length: n }, () => new Array(m).fill(false));

function searchNoCheese() {
  const visited2 = Array.from({ length: n }, () => new Array(m).fill(false));
  const queue = [[0, 0]];
  while (queue.length) {
    const [r, c] = queue.shift();
    if (visited2[r][c]) continue;
    visited2[r][c] = true;
    noCheeseArr[r][c] = true;

    for (const [dr, dc] of dLoc) {
      const nr = r + dr;
      const nc = c + dc;
      if (
        nr >= 0 &&
        nr < n &&
        nc < m &&
        nc >= 0 &&
        (plate[nr][nc] === 0 || visited[nr][nc])
      ) {
        queue.push([nr, nc]);
      }
    }
  }
}

let tried = 0;
const his = [];

while (true) {
  tried++;
  let cnt = 0;
  searchNoCheese();
  //   noCheeseArr.forEach((r) => {
  //     console.log(r.map((z) => (z ? 1 : 0)).join(" "));
  //   });
  let arr = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (plate[i][j] === 1 && !visited[i][j]) {
        const [rr, c] = bfs(i, j);
        arr = arr.concat(rr);
        cnt += c;
      }
    }
  }

  while (arr.length) {
    const [r, c] = arr.pop();
    noCheeseArr[r][c] = true;
  }

  if (cnt === 0) break;
  his.push(cnt);
}

function bfs(r, c) {
  const rr = [];
  let cnt = 0;
  const queue = [[r, c]];
  while (queue.length) {
    const [r, c] = queue.shift();
    if (visited[r][c]) continue;
    if (
      !(
        noCheeseArr[r - 1][c] ||
        noCheeseArr[r][c - 1] ||
        noCheeseArr[r + 1][c] ||
        noCheeseArr[r][c + 1]
      )
    )
      continue;
    visited[r][c] = true;

    rr.push([r, c]);
    cnt++;
    for (const [dr, dc] of dLoc) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr > 0 && nr < n && nc < m && nc > 0 && plate[nr][nc] === 1) {
        queue.push([nr, nc]);
      }
    }
  }
  return [rr, cnt];
}

console.log(his.length);
console.log(his.at(-1));
