const fs = require("fs");
const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = fs.readFileSync(INPUT_FILE).toString().trim().split("\n");

const [M, N] = inputs[0].split(" ").map(Number);
const inp = Array.from({ length: M + 1 }, () => Array(N + 1).fill(0));
const store = Array.from({ length: M + 1 }, () => Array(N + 1).fill(0));
const print = Array.from({ length: M + 1 }, () => Array(N + 1).fill(0));

let ret = 0;

// 입력 처리
for (let i = 1; i <= M; i++) {
  const row = inputs[i].split("").map(Number);
  for (let j = 1; j <= N; j++) {
    inp[i][j] = row[j - 1];
  }
}

// 탐색
for (let j = 1; j <= N; j++) {
  for (let i = 1; i <= M; i++) {
    for (let k = -1; k <= 1; k++) {
      const prevRow = i + k;
      if (prevRow >= 1 && prevRow <= M) {
        store[i][j] = Math.max(store[i][j], print[prevRow][j - 1]);
      }
    }
    print[i][j] = store[i][j] + inp[i][j];
    ret = Math.max(ret, store[i][j]);
  }
}

// 결과 출력
console.log(ret);
