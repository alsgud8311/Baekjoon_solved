const inputs = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const target = +inputs[0];
const m = +inputs[1];
let broken = [];
if (m > 0) broken = inputs[2].split(" ").map(Number);

function findClosestChannel(target) {
  let closestChannel = Infinity;
  let minDistance = Infinity;

  for (let candidate = 0; candidate <= 1000000; candidate++) {
    const candidateStr = candidate.toString();

    if ([...candidateStr].some((char) => broken.includes(+char))) continue;

    const distance = Math.abs(candidate - target);

    if (distance < minDistance) {
      minDistance = distance;
      closestChannel = candidate;
    }
  }

  return { channel: closestChannel, distance: minDistance };
}

const moveByButtons = findClosestChannel(target);
const moveByPlusMinus = Math.abs(target - 100);

const result = Math.min(
  moveByButtons.distance + moveByButtons.channel.toString().length,
  moveByPlusMinus
);

console.log(result);
