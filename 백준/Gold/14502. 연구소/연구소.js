const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [n, m] = input[0].split(" ").map(Number);
const lab = input.slice(1).map((row) => row.split(" ").map(Number));

let maxSafeArea = 0;

function solution() {
  buildWall(0);
  console.log(maxSafeArea);
}

function buildWall(count) {
  if (count === 3) {
    const spreadLab = lab.map((row) => [...row]);
    spreadVirus(spreadLab);
    maxSafeArea = Math.max(maxSafeArea, countSafeArea(spreadLab));
    return;
  }

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < m; col++) {
      if (lab[row][col] === 0) {
        lab[row][col] = 1;
        buildWall(count + 1);
        lab[row][col] = 0;
      }
    }
  }
}

function spreadVirus(labCopy) {
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const queue = [];

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < m; col++) {
      if (labCopy[row][col] === 2) queue.push([row, col]);
    }
  }

  while (queue.length > 0) {
    const [row, col] = queue.shift();

    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;

      if (
        newRow >= 0 &&
        newRow < n &&
        newCol >= 0 &&
        newCol < m &&
        labCopy[newRow][newCol] === 0
      ) {
        labCopy[newRow][newCol] = 2;
        queue.push([newRow, newCol]);
      }
    }
  }
}

function countSafeArea(labCopy) {
  let count = 0;
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < m; col++) {
      if (labCopy[row][col] === 0) count++;
    }
  }
  return count;
}

solution();
