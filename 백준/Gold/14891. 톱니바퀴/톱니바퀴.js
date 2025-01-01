const inputs = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const wheels = [[], ...inputs.slice(0, 4).map((wheel) => Array.from(wheel))];
const k = +inputs[4];
const spins = inputs.slice(5).map((spin) => spin.split(" ").map(Number));

spins.forEach(([wheelToSpin, dir]) => {
  const relatedList = [[wheelToSpin, dir]];
  getRelatedWheels(wheelToSpin, wheelToSpin, relatedList, +dir);
  relatedList.forEach(([wheelNum, dir]) => {
    spin(wheelNum, dir);
  });
});

let result = 0;
for (let i = 1; i < 5; i++) {
  if (wheels[i][0] === "1") result += 2 ** (i - 1);
}
console.log(result);

function spin(wheelNum, dir) {
  let moving;
  if (dir === -1) {
    moving = wheels[wheelNum].shift();
    wheels[wheelNum].push(moving);
  } else if (dir === 1) {
    moving = wheels[wheelNum].pop();
    wheels[wheelNum].unshift(moving);
  }
}

function getRelatedWheels(
  root,
  wheelNum,
  wheelList,
  dir,
  visited = Array(5).fill(false)
) {
  if (visited[wheelNum] || !(wheelNum >= 1 && wheelNum <= 4)) return;
  visited[wheelNum] = true;

  if (wheelNum > 1 && !visited[wheelNum - 1]) {
    if (wheels[wheelNum - 1][2] !== wheels[wheelNum][6]) {
      wheelList.push([wheelNum - 1, -dir]);
      getRelatedWheels(root, wheelNum - 1, wheelList, -dir, visited);
    }
  }

  if (wheelNum < 4 && !visited[wheelNum + 1]) {
    if (wheels[wheelNum + 1][6] !== wheels[wheelNum][2]) {
      wheelList.push([wheelNum + 1, -dir]);
      getRelatedWheels(root, wheelNum + 1, wheelList, -dir, visited);
    }
  }
}
