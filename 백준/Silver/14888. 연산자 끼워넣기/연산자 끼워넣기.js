const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const [N, nums, ops] = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const n = +N;
const numbers = nums.split(" ").map(Number);
const operations = ops.split(" ").map(Number);
const result = [];

function backTrack(p, operation, acc) {
  switch (operation) {
    case 0:
      acc += numbers[p];
      break;
    case 1:
      acc -= numbers[p];
      break;
    case 2:
      acc *= numbers[p];
      break;
    case 3:
      if (acc < 0) {
        acc = -Math.floor(-acc / numbers[p]);
      } else {
        acc = Math.floor(acc / numbers[p]);
      }
      break;
  }
  if (p === n - 1) {
    result.push(acc);
    return;
  }

  if (p + 1 <= n) {
    for (let i = 0; i < 4; i++) {
      if (operations[i]) {
        operations[i]--;
        backTrack(p + 1, i, acc);
        operations[i]++;
      }
    }
  }
}

for (let i = 0; i < 4; i++) {
  if (operations[i]) {
    operations[i]--;
    backTrack(1, i, numbers[0]);
    operations[i]++;
  }
}

console.log(Math.max(...result) === 0 ? 0 : Math.max(...result));
console.log(Math.min(...result) === 0 ? 0 : Math.min(...result));
