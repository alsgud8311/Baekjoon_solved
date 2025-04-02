const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

let test = 1;
let i = 0;
while (i < inputs.length) {
  const n = Number(inputs[i]);
  if (isNaN(n) || n <= 0) break;

  const map = [];
  for (let j = 1; j <= n; j++) {
    map.push(inputs[i + j].split(" ").map(Number));
  }

  const minVal = search(map);
  console.log(`${test}. ${minVal}`);

  i += n + 1; // 테스트 케이스 크기 + 테스트 케이스 첫 줄
  test++;
}

function search(map) {
  const rows = map.length;
  if (rows === 0) return Infinity;

  const dp = Array.from({ length: rows }, () => Array(3).fill(Infinity));

  // 초기값 설정 (C++ 코드와 동일하게)
  dp[0][0] = Infinity;
  dp[0][1] = map[0][1];
  dp[0][2] = map[0][1] + map[0][2];

  // DP 테이블 채우기
  for (let i = 1; i < rows; i++) {
    // 왼쪽 열 계산
    dp[i][0] = Math.min(dp[i - 1][0], dp[i - 1][1]) + map[i][0];

    // 중간 열 계산 (현재 행의 이전 열도 고려)
    dp[i][1] =
      Math.min(dp[i - 1][0], dp[i - 1][1], dp[i - 1][2], dp[i][0]) + map[i][1];

    // 오른쪽 열 계산 (현재 행의 이전 열도 고려)
    dp[i][2] = Math.min(dp[i - 1][1], dp[i - 1][2], dp[i][1]) + map[i][2];
  }

  // 마지막 행의 중간 열 반환
  return dp[rows - 1][1];
}
