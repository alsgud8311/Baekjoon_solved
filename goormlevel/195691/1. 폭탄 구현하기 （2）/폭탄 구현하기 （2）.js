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
    n++;
  } else if (n <= N) {
    ground.push(
      line.split(" ").map((val) => {
        let groundMap = [val, 0];
        return groundMap;
      })
    );
    n++;
  } else if (n > N && n <= N + K) {
    bomb.push(line.split(" ").map(Number));
    n++;
  }
  if (n > N + K) rl.close();
});

rl.on("close", () => {
  let max = 0;
  for (let i = 0; i < bomb.length; i++) {
    boom(bomb[i][0] - 1, bomb[i][1] - 1);
    boom(bomb[i][0] - 2, bomb[i][1] - 1);
    boom(bomb[i][0] - 1, bomb[i][1] - 2);
    boom(bomb[i][0], bomb[i][1] - 1);
    boom(bomb[i][0] - 1, bomb[i][1]);
  }
  for (let l = 0; l < N; l++) {
    for (let k = 0; k < N; k++) {
      if (max < ground[l][k][1]) {
        max = ground[l][k][1];
      }
    }
  }
  console.log(max);
});

function boom(locY, locX) {
  if (locY < N && locY >= 0 && locX < N && locX >= 0) {
    if (ground[locY][locX][0] === "@") {
      ground[locY][locX][1] += 2;
    } else if (ground[locY][locX][0] === "0") {
      ground[locY][locX][1] += 1;
    }
  }
  return;
}
