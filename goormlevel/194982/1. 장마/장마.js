// Run by Node.js
const readline = require("readline");

let n = 0;
let N, M, ground;
let rain = [];
(async () => {
  let rl = readline.createInterface({ input: process.stdin });
  for await (const line of rl) {
    if (n === 0) {
      [N, M] = line.split(" ").map(Number);
      n++;
    } else if (n < 2) {
      ground = line.split(" ").map(Number);
      n++;
    } else {
      rain.push(line.split(" ").map(Number));
      n++;
    }
    if (n === M + 2) {
      solution();
      console.log(ground.join(" "));
      rl.close();
    }
  }

  process.exit();
})();

function solution() {
  let rained = 0;
  let rainedGround = new Set();
  //총 장마 일수동안 반복
  for (let i = 0; i < M; i++) {
    rained++;
    // 장마로 인해 물이 찰 때
    for (let j = rain[i][0]; j < rain[i][1] + 1; j++) {
      ground[j - 1] += 1;
      rainedGround.add(j - 1);
    }
    //배수시스템이 작동하는 날
    // 해당 그 전 2개까지 인덱싱하여 거기 내린 비만 땅의 높이 줄이기
    if (rained % 3 === 0) {
      rainedGround.forEach((g) => (ground[g] -= 1));
      rainedGround.clear();
    }
  }
}
