const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const sangguenCard = inputs[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
const numberCard = inputs[3].split(" ").map(Number);

const result = [];
for (let i = 0; i < numberCard.length; i++) {
  result.push(binarySearch(numberCard[i]));
}

function binarySearch(target) {
  let left = 0;
  let right = sangguenCard.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = sangguenCard[mid];
    if (midValue === target) return 1;
    if (midValue < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return 0;
}
console.log(result.join(" "));
