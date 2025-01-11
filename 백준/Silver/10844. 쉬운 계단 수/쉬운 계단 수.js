const dpTable = Array.from({ length: 101 }, () => Array(10).fill(0));
dpTable[1].fill(1);
for (let i = 2; i < 101; i++) {
  for (let j = 0; j < 10; j++) {
    let cnt = 0;
    if (j > 0) {
      cnt += dpTable[i - 1][j - 1];
    }
    if (j < 9) {
      cnt += dpTable[i - 1][j + 1];
    }
    dpTable[i][j] = cnt % 1000000000;
  }
}

const n = Number(require("fs").readFileSync("/dev/stdin").toString().trim());
const sum = dpTable[n].reduce((acc, curr) => acc + curr, 0);
console.log((sum - dpTable[n][0]) % 1000000000);
