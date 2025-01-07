const inputs = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const result = [];

for (let i = 1; i < inputs.length; i += 2) {
  const n = +inputs[i];
  const arr = inputs[i + 1].split(" ").map(Number);

  const graph = Array.from({ length: n + 1 }, () => []);
  const visited = Array(n + 1).fill(false);

  for (let j = 0; j < n; j++) {
    const from = j + 1;
    const to = arr[j];
    graph[from].push(to);
    graph[to].push(from);
  }

  let cnt = 0;

  for (let k = 1; k <= n; k++) {
    if (!visited[k]) {
      cnt++;
      dfs(k, graph, visited);
    }
  }

  result.push(cnt);
}

console.log(result.join("\n"));

function dfs(node, graph, visited) {
  visited[node] = true;
  for (const neighbor of graph[node]) {
    if (!visited[neighbor]) {
      dfs(neighbor, graph, visited);
    }
  }
}
