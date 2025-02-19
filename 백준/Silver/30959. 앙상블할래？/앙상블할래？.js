const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const [a, ans, ...rest] = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

const [n, m] = a.split(" ").map(Number);
const answer = ans.split(" ").map(Number);
const predicts = rest.map((r) => r.split(" ").map(Number));
const visited = new Array(n).fill(false);

const MAX_SINGLE = Math.max(
  ...predicts.map((model) =>
    model.reduce((sum, pred, i) => sum + (1 - (pred ^ answer[i])), 0)
  )
);

function backTrack(start, count) {
  let correct = 0;
  for (let i = 0; i < m; i++) {
    let ones = 0;
    let total = 0;
    for (let j = 0; j < n; j++) {
      if (visited[j]) {
        total++;
        if (predicts[j][i] === 1) ones++;
      }
    }
    const prediction = ones > total / 2 ? 1 : 0;
    if (prediction === answer[i]) correct++;
  }

  if (correct > MAX_SINGLE) {
    console.log(1);
    process.exit(0);
  }

  // 두 개씩 선택하기
  for (let i = start; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      if (!visited[i] && !visited[j]) {
        visited[i] = true;
        visited[j] = true;
        backTrack(j + 1, count + 2); // j + 1부터 시작하여 중복 방지
        visited[i] = false;
        visited[j] = false;
      }
    }
  }
}

// 한 개만 선택하는 경우
for (let i = 0; i < n; i++) {
  visited[i] = true;
  backTrack(i + 1, 1);
  visited[i] = false;
}

console.log(0);
