const readline = require("readline");
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let n = 0;
let bomb = [];
let ground = [];
let N, K;
rl.on("line", (line) => {
  if (n === 0) {
    [N, K] = line.split(" ").map(Number);
    for (let i = 0; i < N; i++) {
      ground.push(new Array(N).fill(0));
    }
    n++;
  } else if (n <= K + 1) {
    bomb.push(line.split(" ").map(Number));
    n++;
  }
  if (n > N + K) rl.close();
});

rl.on("close", () => {
  for (let i = 0; i < bomb.length; i++) {
    boom(bomb[i][0] - 1, bomb[i][1] - 1);
    boom(bomb[i][0] - 2, bomb[i][1] - 1);
    boom(bomb[i][0] - 1, bomb[i][1] - 2);
    boom(bomb[i][0], bomb[i][1] - 1);
    boom(bomb[i][0] - 1, bomb[i][1]);
  }
  let result = 0;
  for (let l = 0; l < N; l++) {
    let sum = 0;
    ground[l].forEach((elem) => {
      sum += elem;
    });
    result += sum;
  }
  console.log(result);
});

function boom(locY, locX) {
  if (locY < N && locY >= 0 && locX < N && locX >= 0) {
    ground[locY][locX] += 1;
  }
  return;
}
