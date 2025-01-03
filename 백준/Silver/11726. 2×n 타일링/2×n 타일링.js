const n = +require("fs").readFileSync("/dev/stdin").toString().trim();
const dpTable = Array(n + 1).fill(0);

for (let i = 0; i < n + 1; i++) {
  if (i <= 2) {
    dpTable[i] = i;
  } else {
    dpTable[i] = (dpTable[i - 1] + dpTable[i - 2]) % 10007;
  }
}

console.log(dpTable[n]);
