const inputs = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const t = +inputs[0];
let i = 1;
const result = [];

while (i < inputs.length) {
  const [v, e] = inputs[i].split(" ").map(Number);
  const edges = inputs.slice(i + 1, i + 1 + e);
  const graph = Array.from({ length: v + 1 }, () => []);
  const visited = Array(v + 1).fill(0); // 0: 방문 안 함, 1: 그룹 1, -1: 그룹 2
  let isBipartite = true;

  edges.forEach((edge) => {
    const [u1, u2] = edge.split(" ").map(Number);
    graph[u1].push(u2);
    graph[u2].push(u1);
  });

  for (let j = 1; j <= v; j++) {
    if (visited[j] === 0) {
      if (!dfs(graph, visited, j, 1)) {
        isBipartite = false;
        break;
      }
    }
  }

  result.push(isBipartite ? "YES" : "NO");
  i += e + 1;
}

function dfs(graph, visited, node, color) {
  visited[node] = color;

  for (const neighbor of graph[node]) {
    if (visited[neighbor] === 0) {
      if (!dfs(graph, visited, neighbor, -color)) return false;
    } else if (visited[neighbor] === color) {
      return false;
    }
  }
  return true;
}

console.log(result.join("\n"));
