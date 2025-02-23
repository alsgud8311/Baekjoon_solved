const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

const coin = +inputs[0]; // 코인 개수
const N = +inputs[1]; // 문제 푼 날 수
const daysSolved = inputs[2].split(" ").map(Number);

// 스트릭 프리즈 개수 (최대 2개)
let freeze = Math.min(Math.floor(coin / 0.99), 2);

// 최장 스트릭 찾기 (투 포인터)
let left = 0;
let freezeUsed = 0;
let maxStreak = 0;
let maxProblems = Math.max(...daysSolved); // 최대로 푼 문제 수

for (let right = 0; right < N; right++) {
  if (daysSolved[right] === 0) freezeUsed++;

  while (freezeUsed > freeze) {
    if (daysSolved[left] === 0) freezeUsed--;
    left++;
  }

  maxStreak = Math.max(maxStreak, right - left + 1);
}

// 결과 출력
console.log(maxStreak);
console.log(maxProblems);