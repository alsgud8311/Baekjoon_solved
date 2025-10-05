const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const n = +inputs[0];
const dice = inputs.slice(1).map((r) => r.split(" ").map(Number));

// 아래 있는 주사위의 윗면이 위에 있는 주사위의 아랫면과 같도록
// 그 중에서도 가질 수 있는 경우 중 최댓값 구하기
// A-F B-D C-E
// 0-5 1-3 2-4
const findMax = (row, ...exclude) => {
  let max = -Infinity;
  for (let i = 0; i < DICE_CNT; i++) {
    if (exclude.includes(i)) continue;
    max = Math.max(max, dice[row][i]);
  }
  return max;
};
const DICE_CNT = 6;
const opposite = {
  0: 5,
  1: 3,
  2: 4,
  3: 1,
  4: 2,
  5: 0,
};

const result = [];

for (let i = 0; i < DICE_CNT; i++) {
  let currBottomIdx = i;
  let currTopIdx = opposite[currBottomIdx];
  let depthToUpdate = 1;
  let acc = findMax(depthToUpdate - 1, currBottomIdx, currTopIdx);
  while (depthToUpdate < n) {
    const prevTopVal = dice[depthToUpdate - 1][currTopIdx];
    currBottomIdx = dice[depthToUpdate].findIndex((e) => e === prevTopVal);
    currTopIdx = opposite[currBottomIdx];
    acc += findMax(depthToUpdate, currTopIdx, currBottomIdx);

    depthToUpdate++;
  }
  result.push(acc);
}

console.log(Math.max(...result));
