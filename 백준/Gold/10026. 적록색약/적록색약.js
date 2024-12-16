const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
const N = parseInt(input[0]);
const area = input.slice(1).map((row) => row.split(""));
const normal = Array.from({ length: N }, () => Array(N).fill(false));
const rgbman = Array.from({ length: N }, () => Array(N).fill(false));

function solution() {
  let normalCount = 0;
  let rgbManCount = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!normal[i][j]) {
        dfs(i, j, false);
        normalCount++;
      }

      if (!rgbman[i][j]) {
        dfs(i, j, true);
        rgbManCount++;
      }
    }
  }

  console.log(normalCount, rgbManCount);

  function dfs(row, col, isRGB) {
    if (row < 0 || col < 0 || row >= N || col >= N) return;
    const visited = isRGB ? rgbman : normal;
    if (visited[row][col]) return;

    const currColor = area[row][col];
    visited[row][col] = true;

    const targetColor = isRGB && currColor !== "B" ? "RG" : currColor;

    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    for (const [dx, dy] of directions) {
      const nx = row + dx;
      const ny = col + dy;
      if (nx >= 0 && ny >= 0 && nx < N && ny < N) {
        const nextColor = area[nx][ny];
        const nextTargetColor = isRGB && nextColor !== "B" ? "RG" : nextColor;

        if (targetColor.includes(nextTargetColor)) {
          dfs(nx, ny, isRGB);
        }
      }
    }
  }
}

solution();
