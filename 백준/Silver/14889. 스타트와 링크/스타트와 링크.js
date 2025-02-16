const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const [n, ...rest] = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

const N = +n;
const abilityMap = rest.map((r) => r.split(" ").map(Number));
const pairs = Array.from({ length: N }, () => Array(N).fill(0));
const visited = new Array(N).fill(false);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    pairs[i][j] = abilityMap[i][j] + abilityMap[j][i]; // 두 명이 한 팀일 때의 능력치 저장
  }
}

let min = Infinity;

function backTrack(count, idx) {
  if (count === N / 2) {
    let start = 0,
      link = 0;

    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        if (visited[i] && visited[j]) start += pairs[i][j];
        else if (!visited[i] && !visited[j]) link += pairs[i][j];
      }
    }

    min = Math.min(min, Math.abs(start - link));
    return;
  }

  for (let i = idx; i < N; i++) {
    if (!visited[i]) {
      visited[i] = true;
      backTrack(count + 1, i + 1);
      visited[i] = false;
    }
  }
}

backTrack(0, 0);
console.log(min);
