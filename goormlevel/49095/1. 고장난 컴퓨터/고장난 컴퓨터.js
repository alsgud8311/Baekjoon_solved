// Run by Node.js
const readline = require("readline");

let N, C;
let n = 0;
let code;
(async () => {
  let rl = readline.createInterface({ input: process.stdin });

  for await (const line of rl) {
    if (n === 0) {
      [N, C] = line.split(" ").map(Number);
      n++;
    } else if (n === 1) {
      code = line.split(" ").map(Number);
      n++;
    }

    if (n === 2) {
      solution();
      rl.close();
    }
  }
})();

function solution() {
  let endTime = code[0];
  let cnt = 1;
  for (let i = 1; i < code.length; i++) {
    if (code[i] - endTime <= C) {
      cnt++;
      endTime = code[i];
    } else {
      cnt = 1;
      endTime = code[i];
    }
  }
  console.log(cnt);
}
