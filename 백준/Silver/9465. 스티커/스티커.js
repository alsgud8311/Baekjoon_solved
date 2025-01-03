const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const T = Number(input[0]);
const results = [];

let idx = 1;
for (let t = 0; t < T; t++) {
  const n = Number(input[idx]);
  const arr = [
    [0, ...input[idx + 1].split(" ").map(Number)],
    [0, ...input[idx + 2].split(" ").map(Number)],
  ];
  idx += 3;

  if (n === 1) {
    results.push(Math.max(arr[0][1], arr[1][1]));
    continue;
  }

  let prevTop = arr[0][1];
  let prevBottom = arr[1][1];
  let prevTop2 = 0;
  let prevBottom2 = 0;

  for (let j = 2; j <= n; j++) {
    const currTop = Math.max(prevBottom, prevBottom2) + arr[0][j];
    const currBottom = Math.max(prevTop, prevTop2) + arr[1][j];

    prevTop2 = prevTop;
    prevBottom2 = prevBottom;
    prevTop = currTop;
    prevBottom = currBottom;
  }

  results.push(Math.max(prevTop, prevBottom));
}

console.log(results.join("\n"));
