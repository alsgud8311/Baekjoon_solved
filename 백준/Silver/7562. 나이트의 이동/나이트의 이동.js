const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

const dLoc = [
  // 좌상
  [-2, -1],
  [-1, -2],
  //우상
  [-2, 1],
  [-1, 2],
  //좌하
  [1, -2],
  [2, -1],
  //우하,
  [1, 2],
  [2, 1],
];
for (let i = 1; i < inputs.length; i += 3) {
  const l = +inputs[i];
  const [kr, kc] = inputs[i + 1].split(" ").map(Number);
  const [tr, tc] = inputs[i + 2].split(" ").map(Number);
  const result = bfs(l, kr, kc, tr, tc);
  console.log(result);
}

function bfs(q, r, c, targetR, targetC) {
  const visited = Array.from({ length: q }, () => new Array(q).fill(false));
  let queue = [[r, c, 0]];
  while (queue.length) {
    const [rr, cc, dd] = queue.shift();
    if (visited[rr][cc]) continue;
    visited[rr][cc] = true;
    if (rr === targetR && cc === targetC) {
      return dd;
    }
    for (const [r, c] of dLoc) {
      const nr = rr + r;
      const nc = cc + c;
      if (nr >= 0 && nr < q && nc >= 0 && nc < q && !visited[nr][nc]) {
        queue.push([nr, nc, dd + 1]);
      }
    }
  }
}
