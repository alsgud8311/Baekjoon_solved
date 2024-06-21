const readline = require("readline");

let n = 0;
let N;
let stock = [];
(async () => {
  let rl = readline.createInterface({ input: process.stdin });
  for await (const line of rl) {
    if (n === 0) {
      N = parseInt(line);
    } else if (n <= N) {
      let [stockNum, stockPrice] = line.split(" ").map(Number);
      let value = Math.floor(stockNum * stockPrice * 10) / 10;
      stock.push({ index: n, value });
    }
    n++;
    if (n > N) {
      solution();
      rl.close();
    }
  }
})();

function solution() {
  stock.sort((a, b) => {
    if (b.value === a.value) {
      return a.index - b.index;
    }
    return b.value - a.value;
  });
  console.log(stock.map((item) => item.index).join(" "));
}
