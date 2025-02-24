const fs = require("fs");
const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = fs.readFileSync(INPUT_FILE).toString().trim().split("\n");

const [m, n] = inputs[0].split(" ").map(Number);
const arr = [
  new Array(n + 1).fill(0),
  ...inputs.slice(1).map((e) => [0, ...e.split("").map(Number)]),
];
const resultArr = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

const dLoc = [
  [0, -1],
  [-1, 0],
  [1, 0],
];

let max = -Infinity;
// 열
for (let i = 1; i <= n; i++) {
  // 행
  for (let j = 1; j <= m; j++) {
    // 첫 줄은 출력값이 자기 가중치 그대로 감
    if (i === 1) {
      resultArr[j][i] = arr[j][i];
    } else {
      const queue = [[j, i]];
      const visited = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
      while (queue.length) {
        const [row, col] = queue.shift();
        for (const [dr, dc] of dLoc) {
          const nr = row + dr;
          const nc = col + dc;
          if (nr < 1 || nr > m || nc < 1 || nc > n || visited[nr][nc]) continue;
          if (Math.abs(j - nr) <= i - nc && nc < i) {
            // 가중치에 출력값을 더한거랑 비교해봄
            resultArr[j][i] = Math.max(
              resultArr[j][i],
              resultArr[nr][nc] + arr[j][i]
            );
            visited[nr][nc] = 1;
            max = Math.max(max, resultArr[nr][nc]);
            queue.push([nr, nc]);
          }
        }
      }
    }
  }
}

console.log(max);
