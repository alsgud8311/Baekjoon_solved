const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const t = +inputs[0];

function isSosu(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

function findPartition(target) {
  let n1 = Math.floor(target / 2);
  let n2 = target - n1;

  while (n1 > 0) {
    if (isSosu(n1) && isSosu(n2)) {
      return [n1, n2];
    }
    n1--;
    n2++;
  }
}

for (let i = 1; i <= t; i++) {
  const target = +inputs[i];
  const [n1, n2] = findPartition(target);
  console.log(n1, n2);
}
