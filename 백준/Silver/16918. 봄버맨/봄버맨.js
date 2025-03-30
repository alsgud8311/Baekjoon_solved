const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

const [r, c, n] = inputs[0].split(" ").map(Number);

const map = inputs.slice(1).map((r) => Array.from(r));
if (n % 2 === 0) {
  console.log("O".repeat(c).concat("\n").repeat(r).trim());
  process.exit(0);
}

const dLoc = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

let firstBoom = Array.from({ length: r }, () => new Array(c).fill("O"));
for (let i = 0; i < r; i++) {
  for (let j = 0; j < c; j++) {
    if (map[i][j] === "O") {
      firstBoom[i][j] = ".";
      for (const [dx, dy] of dLoc) {
        const nRow = i + dx;
        const nCol = j + dy;
        if (nRow >= 0 && nRow < r && nCol >= 0 && nCol < c) {
          firstBoom[nRow][nCol] = ".";
        }
      }
    }
  }
}

let secondBoom = Array.from({ length: r }, () => new Array(c).fill("O"));
for (let i = 0; i < r; i++) {
  for (let j = 0; j < c; j++) {
    if (firstBoom[i][j] === "O") {
      secondBoom[i][j] = ".";
      for (const [dx, dy] of dLoc) {
        const nRow = i + dx;
        const nCol = j + dy;
        if (nRow >= 0 && nRow < r && nCol >= 0 && nCol < c) {
          secondBoom[nRow][nCol] = ".";
        }
      }
    }
  }
}
let result;
//처음 터졌을 때
if (n % 4 === 3) {
  result = firstBoom;
  // 원래 상태 Or 두번째 폭발
} else if (n % 4 === 1) {
  if (n === 1) result = map;
  //1초 후면서 3초 후일 때
  else result = secondBoom;
}

console.log(result.map((row) => row.join("")).join("\n"));
