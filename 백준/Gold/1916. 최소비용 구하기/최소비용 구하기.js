const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
const inputs = fs.readFileSync(path).toString().trim().split('\n');
const n = +inputs[0];
const m = +inputs[1];
const graph = Array.from({ length: n + 1 }, () => []);
const [start, end] = inputs.at(-1).split(' ').map(Number);

for (let i = 2; i < m + 2; i++) {
  const [s, e, c] = inputs[i].split(' ').map(Number);

  graph[s].push([e, c]);
}

const getMinNode = (distances, visited) => {
  let minDistance = Infinity;
  let minNode = -1;

  for (let i = 1; i <= n; i++) {
    if (!visited[i] && distances[i] < minDistance) {
      minDistance = distances[i];
      minNode = i;
    }
  }

  return minNode;
};

const dijkstra = (start, end) => {
  const distances = Array(n + 1).fill(Infinity);
  const visited = Array(n + 1).fill(false);
  distances[start] = 0;

  for (let i = 0; i < n; i++) {
    const currentNode = getMinNode(distances, visited);

    if (currentNode === -1) break;
    visited[currentNode] = true;

    for (const [nextNode, cost] of graph[currentNode]) {
      const distance = distances[currentNode] + cost;

      if (distance < distances[nextNode]) distances[nextNode] = distance;
    }
  }

  return distances[end];
};

console.log(dijkstra(start, end));