const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const n = +inputs[0];
const liquids = inputs[1].split(" ").map(Number);

let left = 0;
let right = n - 1;
//좌우로 계속 가면서
// -와 +에서 각각 탐색
let min = Infinity;
//-값이면 좌, +면 우

while (left < right) {
  const sum = liquids[left] + liquids[right];
  if (Math.abs(sum) < Math.abs(min)) {
    min = sum;
  }
  if (sum < 0) left++;
  else right--;
}
console.log(min);
