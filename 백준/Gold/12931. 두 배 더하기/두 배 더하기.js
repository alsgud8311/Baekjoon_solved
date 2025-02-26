const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

const n = +inputs[0];
let targetArr = inputs[1].split(" ").map(Number);

let min = 0;

while (targetArr.some((a) => a > 0)) {
  if (targetArr.every((a) => a % 2 === 0)) {
    targetArr = targetArr.map((a) => a / 2);
    min++;
  } else {
    for (let i = 0; i < n; i++) {
      if (targetArr[i] % 2 === 1) {
        targetArr[i]--;
        min++;
      }
    }
  }
}

console.log(min);
