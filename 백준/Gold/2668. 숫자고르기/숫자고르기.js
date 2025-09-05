const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const n = inputs[0];
const secondRow = [0, ...inputs.slice(1)];
const visited = new Array(n + 1).fill(false);
let wtf = false;
const realset = new Set();

for (let i = 1; i <= n; i++) {
  if (!visited[i]) {
    const result = dfs(i, i, new Set());
    if (wtf) {
      for (const ee of result) {
        realset.add(ee);
      }
    } else {
      for (const ee of result) {
        visited[ee] = false;
      }
    }
    wtf = false;
  }
}

// 1 2 3 4 5 6 7
// 3 1 1 5 5 4 6

function dfs(start, r, set) {
  if (visited[r]) {
    if (start === r) {
      wtf = true;
    }
    return set;
  }
  set.add(r);
  visited[r] = true;
  return dfs(start, secondRow[r], set);
}
console.log(realset.size.toString());
console.log([...realset.values()].sort((a, b) => a - b).join("\n"));
