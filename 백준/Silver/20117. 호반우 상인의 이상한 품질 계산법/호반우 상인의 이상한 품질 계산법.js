const inputs = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const n = +inputs[0];
const hobanwoo = inputs[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let result = 0;
while (hobanwoo.length) {
  if (hobanwoo.length === 1) {
    result += hobanwoo.pop();
    break;
  }
  hobanwoo.shift();
  const popped = hobanwoo.pop();
  result += popped * 2;
}
console.log(result);
