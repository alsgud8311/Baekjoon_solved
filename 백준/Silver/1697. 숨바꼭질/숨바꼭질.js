const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const [n, k] = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(" ")
  .map(Number);
const visited = new Array(100000).fill(false);
visited[n] = true;
const queue = [[n, 0]];
let min = Infinity;

while (queue.length) {
  const [loc, time] = queue.shift();
  if (loc === k) {
    min = Math.min(min, time);
    break;
  }
  if (loc + 1 <= 100000 && !visited[loc + 1]) {
    visited[loc + 1] = true;
    queue.push([loc + 1, time + 1]);
  }
  if (loc - 1 >= 0 && !visited[loc - 1]) {
    visited[loc - 1] = true;
    queue.push([loc - 1, time + 1]);
  }
  if (loc * 2 <= 100000 && !visited[loc * 2]) {
    visited[loc * 2] = true;
    queue.push([loc * 2, time + 1]);
  }
}

console.log(min);
