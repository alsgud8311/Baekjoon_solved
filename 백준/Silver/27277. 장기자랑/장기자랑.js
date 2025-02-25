const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const n = +inputs[0];
const peoples = inputs[1].split(" ").map(Number);

peoples.sort((a, b) => a - b);

//p를 위한 포인터
let pleft = 0;
let pright = n - 1;
let idx = 0;
const p = new Array(n);
const copy = new Array(n);

while (pleft <= pright) {
  if (idx % 2 === 0) {
    p[idx] = peoples[pright];
    copy[idx] = peoples[pright];
    pright--;
  } else {
    p[idx] = peoples[pleft];
    copy[idx] = peoples[pleft];
    pleft++;
  }
  idx++;
}

for (let i = 1; i < n; i++) {
  p[i] = Math.max(p[i] - copy[i - 1], 0);
}

const sum = p.reduce((acc, cur) => acc + cur, 0);
console.log(sum);
