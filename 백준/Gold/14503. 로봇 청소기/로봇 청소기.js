let input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

let [n, m] = input.shift().split(" ").map(Number);
let [r, c, d] = input.shift().split(" ").map(Number);
let room = [];
while (input.length !== 0) {
  room.push(input.shift().split(" ").map(Number));
}
let cleaned = 0;

// 방향: 북, 동, 남, 서 (0, 1, 2, 3)
const directions = [
  [-1, 0], // 북
  [0, 1], // 동
  [1, 0], // 남
  [0, -1], // 서
];

while (true) {
  // 현재 칸을 청소
  if (room[r][c] === 0) {
    room[r][c] = 2; // 청소된 칸을 2로 표시
    cleaned++;
  }

  let cleanedAround = false;
  // 현재 방향을 기준으로 반시계 방향으로 4방향 탐색
  for (let i = 0; i < 4; i++) {
    d = (d + 3) % 4; // 반시계 방향 회전
    let [dr, dc] = directions[d];
    let nr = r + dr;
    let nc = c + dc;

    if (nr >= 0 && nr < n && nc >= 0 && nc < m && room[nr][nc] === 0) {
      r = nr;
      c = nc;
      cleanedAround = true;
      break;
    }
  }

  // 네 방향 모두 청소가 이미 되었거나 벽인 경우
  if (!cleanedAround) {
    let [dr, dc] = directions[(d + 2) % 4]; // 후진 방향
    let nr = r + dr;
    let nc = c + dc;

    if (nr >= 0 && nr < n && nc >= 0 && nc < m && room[nr][nc] !== 1) {
      r = nr;
      c = nc; // 후진
    } else {
      break; // 후진할 수 없으면 작동 멈춤
    }
  }
}

console.log(cleaned);
