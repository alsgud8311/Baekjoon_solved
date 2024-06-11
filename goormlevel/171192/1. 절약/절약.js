// Run by Node.js
const readline = require("readline");

(async () => {
  let rl = readline.createInterface({ input: process.stdin });
  let n;
  let datas = [];
  for await (const line of rl) {
    const [s, number] = line.split(" ");
    if (!n) {
      n = line;
      continue;
    } else if (s === "in") datas.push(["in", Number(number)]);
    else if (s === "out") datas.push(["out", Number(number)]);
    if (!line) rl.close();
  }
  solution(datas);
  process.exit();
})();

function solution(datas) {
  let result = 0;
  let check = false;
  for (let val of datas) {
    val[0] === "in" ? (result += val[1]) : (result -= val[1]);
    if (result < 0) check = true;
  }
  console.log(check ? "fail" : "success");
}
