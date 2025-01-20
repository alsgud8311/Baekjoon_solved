const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const [n, ...stairs] = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const dpArr = [...stairs];

if (n >= 2) dpArr[1] += dpArr[0];
if (n >= 3) dpArr[2] += Math.max(stairs[0], stairs[1]);

for (let i = 3; i < n; i++) {
  dpArr[i] = Math.max(dpArr[i - 2], dpArr[i - 3] + stairs[i - 1]) + stairs[i];
}
console.log(dpArr.at(-1));
