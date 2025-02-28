const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const n = +inputs[0];

const wordMap = {};

for (let i = 1; i <= n; i++) {
  const alphabets = inputs[i].split("");
  let temp = alphabets.length - 1;
  for (let j = 0; j < alphabets.length; j++) {
    wordMap[alphabets[j]]
      ? (wordMap[alphabets[j]] += Math.pow(10, temp))
      : (wordMap[alphabets[j]] = Math.pow(10, temp));
    temp--;
  }
}
const sortedWordMap = Object.entries(wordMap).sort((a, b) => b[1] - a[1]);

let max = 9;
let acc = 0;
for (let i = 0; i < sortedWordMap.length; i++) {
  acc += sortedWordMap[i][1] * max;
  max--;
}
console.log(acc);
