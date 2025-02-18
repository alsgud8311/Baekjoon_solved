const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
let [n, k] = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

let res8 = 0,
  res4 = 0,
  res1 = 0;
if (n >= 8) {
  res8 = Math.floor(n / 8);
  n %= 8;
}

if (n >= 4) {
  res4 = Math.floor(n / 4);
  n %= 4;
}

res1 = n;

let timeSum = res8 + res4 + res1;
if (timeSum > k) {
  console.log(-1);
  process.exit(0);
}

if (timeSum < k) {
  if (res8 > 0 && k - timeSum >= res8) {
    res4 += res8 * 2;
    res8 = 0;
    timeSum = res4 + res1 + res8;
  }
  if (res4 > 0 && k - timeSum >= res4 * 3) {
    res1 += res4 * 4;
    res4 = 0;
    timeSum = res1 + res4 + res8;
  }
}
const result = [];
if (res8 > 0) result.push([8, res8]);
if (res4 > 0) result.push([4, res4]);
if (res1 > 0) result.push([1, res1]);
console.log(result.length);
console.log(`${k - timeSum} ${result[0][0]}`);
let currTime = k - timeSum + result[0][1];
for (let i = 1; i < result.length; i++) {
  console.log(`${currTime} ${result[i][0]}`);
  currTime += result[i][1];
}
