const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

const [n, m] = inputs[0].split(" ").map(Number);
const students = inputs[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let left = 0;
let right = n - 1;
let team = 0;
while (left < right) {
  if (students[left] + students[right] >= m) {
    team++;
    left++;
    right--;
  } else {
    left++;
    continue;
  }
}
console.log(team);
