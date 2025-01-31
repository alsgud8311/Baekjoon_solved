const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

const t = +inputs[0];

let index = 1;
for (let testCase = 0; testCase < t; testCase++) {
  const [n, m] = inputs[index].split(" ").map(Number);
  const map = Array.from({ length: n }, (_, i) =>
    inputs[index + 1 + i].split(" ").map(Number)
  );

  const diff = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

  let testIndex = index + 1 + n;
  for (let j = 0; j < m; j++) {
    const [r1, c1, r2, c2, v] = inputs[testIndex + j].split(" ").map(Number);
    diff[r1 - 1][c1 - 1] += v;
    diff[r1 - 1][c2] -= v;
    diff[r2][c1 - 1] -= v;
    diff[r2][c2] += v;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i > 0) diff[i][j] += diff[i - 1][j];
      if (j > 0) diff[i][j] += diff[i][j - 1];
      if (i > 0 && j > 0) diff[i][j] -= diff[i - 1][j - 1];

      map[i][j] += diff[i][j]; // 원래 값에 누적합 적용
    }
  }

  const resultRow = map.map((row) => row.reduce((acc, curr) => acc + curr, 0));
  const resultCol = Array(n).fill(0);
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      resultCol[j] += map[i][j];
    }
  }

  console.log(resultRow.join(" "));
  console.log(resultCol.join(" "));

  index = testIndex + m;
}
