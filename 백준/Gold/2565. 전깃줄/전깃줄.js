const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const [n, ...w] = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const dp = new Array(100).fill(1);
const wires = w.map((w) => w.split(" ").map(Number));
wires.sort((a, b) => a[0] - b[0]);

const lis = [];
for (const [, b] of wires) {
  let left = 0,
    right = lis.length;
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (lis[mid] >= b) right = mid;
    else left = mid + 1;
  }
  if (left < lis.length) lis[left] = b;
  else lis.push(b);
}
console.log(n - lis.length);
