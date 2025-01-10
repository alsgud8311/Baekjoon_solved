const inputs = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const dpTable = Array(11).fill(0);
dpTable[1] = 1;
dpTable[2] = 2;
dpTable[3] = 4;
for (let i = 4; i < dpTable.length; i++) {
  dpTable[i] = dpTable[i - 1] + dpTable[i - 2] + dpTable[i - 3];
}

const result = [];
inputs
  .slice(1)
  .map(Number)
  .forEach((n) => {
    result.push(dpTable[n]);
  });
console.log(result.join("\n"));
