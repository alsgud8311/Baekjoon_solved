const inputs = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [gx, gy, mx, my] = inputs[0].split(" ").map(Number);
const pasture = inputs.slice(1).map((line) => Array.from(line));

const table = Array.from({ length: gy }, (_, i) =>
  Array.from(pasture[i], (ch) => (ch === "*" ? 2 : 0))
);

const startX = mx - 1;
const startY = gy - my;
table[startY][startX] = 1;

const directions = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
  [1, 1],
  [-1, -1],
  [1, -1],
  [-1, 1],
];

let day = 0;
const queue = [[startY, startX, 0]];

while (queue.length > 0) {
  const [row, col, currentDay] = queue.shift();

  day = Math.max(day, currentDay);

  for (const [dx, dy] of directions) {
    const newRow = row + dx;
    const newCol = col + dy;

    if (
      newRow >= 0 &&
      newRow < gy &&
      newCol >= 0 &&
      newCol < gx &&
      table[newRow][newCol] === 0
    ) {
      table[newRow][newCol] = 1; // 방문 처리
      queue.push([newRow, newCol, currentDay + 1]);
    }
  }
}

console.log(day);
