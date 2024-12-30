const inputs = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = +inputs[0];
const m = +inputs[1];

let broken = [];
if (m > 0) broken = inputs[2].split(" ");

const MAX = 1000000;

function search(num) {
  let minDist = Infinity;
  let minLoc = Infinity;
  for (let target = 0; target <= MAX; target++) {
    const stringified = Array.from(target.toString());

    if (stringified.some((char) => broken.includes(char))) continue;

    const dist = Math.abs(num - target);
    if (dist < minDist) {
      minDist = dist;
      minLoc = target;
    }
  }
  return { minDist, minLoc };
}

const { minDist, minLoc } = search(n);

console.log(Math.min(minLoc.toString().length + minDist, Math.abs(n - 100)));
