const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const [size, ...maps] = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const [m, n] = size.split(" ").map(Number);
const land = maps.map((e) => e.split(" ").map(Number));

const dpArr = Array.from({ length: m }, () =>
  Array.from({ length: n }, () => 0)
);

for (let i = 0; i < m; i++) {
  for (let j = 0; j < n; j++) {
    if (land[i][j] === 0) {
      if (i === 0 || j === 0) {
        dpArr[i][j] = 1;
      } else {
        dpArr[i][j] =
          Math.min(dpArr[i - 1][j], dpArr[i][j - 1], dpArr[i - 1][j - 1]) + 1;
      }
    } else {
      dpArr[i][j] = 0;
    }
  }
}

// 최대값 찾기
let max = 0;
for (let i = 0; i < m; i++) {
  for (let j = 0; j < n; j++) {
    max = Math.max(max, dpArr[i][j]);
  }
}
console.log(max);
