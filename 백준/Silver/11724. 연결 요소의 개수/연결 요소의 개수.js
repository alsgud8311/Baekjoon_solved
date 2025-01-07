const inputs = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [n, m] = inputs[0].split(" ").map(Number);
const edges = inputs.slice(1).map((edge) => {
  const [u, v] = edge.split(" ").map(Number);
  return [u, v];
});
const graph = Array.from({ length: n + 1 }, () => []);
for ([u, v] of edges) {
  graph[u].push(v);
  graph[v].push(u);
}

let visited = Array(n + 1).fill(false);
let cnt = 0;
for (let i = 1; i < n + 1; i++) {
  if (!visited[i]) {
    cnt++;
    dfs(i);
  }
}
console.log(cnt);

function dfs(row) {
  visited[row] = true;
  for (const neighbor of graph[row]) {
    if (!visited[neighbor]) {
      dfs(neighbor);
    }
  }
}
