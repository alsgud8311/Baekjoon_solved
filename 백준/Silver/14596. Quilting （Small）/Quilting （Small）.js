const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

const [h, w] = inputs[0].split(" ").map(Number);
const b1 = inputs.slice(1, 1 + h).map((row) => row.split(" ").map(Number));
const b2 = inputs.slice(1 + h).map((row) => row.split(" ").map(Number));
const dpTable = Array.from({ length: h }, () => Array(w).fill(0));

for (let i = 0; i < h; i++) {
  for (let j = 0; j < w; j++) {
    if (i > 0) {
      let temp = dpTable[i - 1][j];
      if (j - 1 >= 0) {
        temp = Math.min(temp, dpTable[i - 1][j - 1]);
      }
      if (j + 1 < w) {
        temp = Math.min(temp, dpTable[i - 1][j + 1]);
      }
      dpTable[i][j] = dpTable[i][j] + temp + (b1[i][j] - b2[i][j]) ** 2;
    } else {
      dpTable[i][j] = (b1[i][j] - b2[i][j]) ** 2;
    }
  }
}

console.log(Math.min(...dpTable.at(-1)));
