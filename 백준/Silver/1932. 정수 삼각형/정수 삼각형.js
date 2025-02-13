const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const [N, ...rest] = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const n = +N;
const arr = rest.map((r) => r.split(" ").map(Number));
const dpArr = rest.map((r) => r.split(" ").map(Number));

//depth
for (let i = 1; i < n; i++) {
  for (let j = 0; j < arr[i].length; j++) {
    if (j === 0) {
      dpArr[i][j] += dpArr[i - 1][j];
      continue;
    } else if (j === arr[i].length - 1) {
      dpArr[i][j] += dpArr[i - 1][j - 1];
      continue;
    } else {
      dpArr[i][j] += Math.max(dpArr[i - 1][j], dpArr[i - 1][j - 1]);
    }
  }
}
console.log(Math.max(...dpArr.at(-1)));
