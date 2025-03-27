const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const [n, m] = inputs[0].split(" ").map(Number);
const boxes = [
  new Array(m).fill(0),
  ...inputs.slice(1).map((b) => [0, ...b.split(" ").map(Number), 0]),
  new Array(m).fill(0),
];

const FULLLENGTH = 2 * n + 2 * m;
const result = [];
//좌 -> 우
for (let i = 1; i <= n; i++) {
  search([i, 1], boxes[i][1] === 1 ? "up" : "right");
}
//하 -> 상
for (let i = 1; i <= m; i++) {
  search([n, i], boxes[n][i] === 1 ? "right" : "up");
}
//우 -> 좌
for (let i = n; i >= 1; i--) {
  search([i, m], boxes[i][m] === 1 ? "down" : "left");
}
//하 -> 상
for (let i = m; i >= 1; i--) {
  search([1, i], boxes[1][i] === 1 ? "left" : "down");
}

function search(route, dir) {
  let [row, col] = route;

  if (row === 0) {
    result.push(FULLLENGTH - col + 1);
    return;
  }

  if (row === n + 1) {
    result.push(n + col);
    return;
  }
  if (col === 0) {
    result.push(row);
    return;
  }

  if (col === m + 1) {
    result.push(n + m + 1 + n - row);
    return;
  }

  switch (dir) {
    case "left":
      if (boxes[row][col - 1] === 1) {
        search([row, col - 1], "down");
      } else {
        search([row, col - 1], "left");
      }
      return;
    case "up":
      if (boxes[row - 1][col] === 1) {
        search([row - 1, col], "right");
      } else {
        search([row - 1, col], "up");
      }
      return;
    case "right":
      if (boxes[row][col + 1] === 1) {
        search([row, col + 1], "up");
      } else {
        search([row, col + 1], "right");
      }
      return;
    case "down":
      if (boxes[row + 1][col] === 1) {
        search([row + 1, col], "left");
      } else {
        search([row + 1, col], "down");
      }
      return;
  }
}

console.log(result.join(" "));
