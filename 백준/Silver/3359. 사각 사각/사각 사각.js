const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

const n = +inputs[0];
const squares = inputs.slice(1).map((s) => s.split(" ").map(Number));
const dpArr = Array.from({ length: n }, () => Array(2).fill(0)); // 각 배열 독립적으로 생성
dpArr[0] = [squares[0][0], squares[0][1]];

for (let i = 1; i < n; i++) {
  // 짧은 변을 위로 했을 때
  dpArr[i][0] =
    squares[i][0] +
    Math.max(
      dpArr[i - 1][0] + Math.abs(squares[i - 1][1] - squares[i][1]),
      dpArr[i - 1][1] + Math.abs(squares[i - 1][0] - squares[i][1])
    );
  // 긴 변을 위로 했을 때
  dpArr[i][1] =
    squares[i][1] +
    Math.max(
      dpArr[i - 1][0] + Math.abs(squares[i - 1][1] - squares[i][0]),
      dpArr[i - 1][1] + Math.abs(squares[i - 1][0] - squares[i][0])
    );
}

console.log(Math.max(dpArr[n - 1][0], dpArr[n - 1][1]));
