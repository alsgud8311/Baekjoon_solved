const [stringA, stringB] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .split("\n")
  .map((strings) => Array.from(strings));

const dpMap = Array.from({ length: stringA.length + 1 }, () =>
  Array(stringB.length + 1).fill(0)
);

for (let i = 1; i < dpMap.length; i++) {
  for (let j = 1; j < dpMap[i].length; j++) {
    if (stringB[j - 1] === stringA[i - 1])
      dpMap[i][j] = dpMap[i - 1][j - 1] + 1;
    else dpMap[i][j] = Math.max(dpMap[i - 1][j], dpMap[i][j - 1]);
  }
}

console.log(dpMap[dpMap.length - 1][dpMap[0].length - 1]);
