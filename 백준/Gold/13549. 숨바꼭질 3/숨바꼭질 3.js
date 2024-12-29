const [N, K] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);
const MAX = 100000;

const distMap = new Map();
const visited = new Set();
let priorityQueue = [];
priorityQueue.push({ to: N, cost: 0 });
distMap.set(N, 0);

const enqueue = (queue, node) => {
  let i = 0;
  while (i < queue.length && queue[i].cost < node.cost) i++;
  queue.splice(i, 0, node); // 우선순위 삽입
};

while (priorityQueue.length) {
  const { to, cost } = priorityQueue.shift(); // 큐의 첫 번째 요소
  if (visited.has(to)) continue;
  visited.add(to);

  if (to === K) {
    console.log(cost);
    break;
  }

  const tempDists = [
    [0, to * 2], // 순간이동
    [1, to + 1], // 앞으로 이동
    [1, to - 1], // 뒤로 이동
  ];

  for (const [toCost, toLoc] of tempDists) {
    if (toLoc < 0 || toLoc > MAX || visited.has(toLoc)) continue;

    const nextCost = cost + toCost;
    if (!distMap.has(toLoc) || nextCost < distMap.get(toLoc)) {
      distMap.set(toLoc, nextCost);
      enqueue(priorityQueue, { to: toLoc, cost: nextCost });
    }
  }
}
