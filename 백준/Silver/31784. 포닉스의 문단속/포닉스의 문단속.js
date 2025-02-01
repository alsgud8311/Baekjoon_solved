const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

const [n, k] = inputs[0].split(" ").map(Number);
const chArr = inputs[1].split("");
let K = k;

let idx = 0;
while (K > 0) {
  if (idx === n - 1) {
    K %= 26;
    if (K >= "Z".charCodeAt(0) + 1 - chArr[idx].charCodeAt(0)) {
      K -= "Z".charCodeAt(0) + 1 - chArr[idx].charCodeAt(0);
      chArr[idx] = "A";
    }
    chArr[idx] = String.fromCharCode(chArr[idx].charCodeAt(0) + K);
    K = 0;
  } else {
    if (chArr[idx] === "A") {
      idx++;
      continue;
    } else {
      const count = "Z".charCodeAt(0) - chArr[idx].charCodeAt(0) + 1;
      if (count <= K) {
        chArr[idx] = "A";
        K -= count;
        idx++;
      } else {
        idx++;
      }
    }
  }
}

console.log(chArr.join(""));
