const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

for (let i = 1; i < inputs.length - 1; i += 2) {
  const n = +inputs[i];
  const students = [0, ...inputs[i + 1].split(" ").map(Number)];
  const visited = new Array(n + 1).fill(false);
  const finished = new Array(n + 1).fill(false);
  let group = 0;

  function dfs(node) {
    visited[node] = true;
    let next = students[node];

    if (!visited[next]) {
      dfs(next);
    } else if (!finished[next]) {
      let count = 1;
      let cur = next;
      while (cur !== node) {
        count++;
        cur = students[cur];
      }
      group += count;
    }

    finished[node] = true;
  }

  for (let j = 1; j <= n; j++) {
    if (!visited[j]) dfs(j);
  }

  console.log(n - group);
}
