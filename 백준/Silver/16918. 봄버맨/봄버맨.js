const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const [r, c, n] = inputs[0].split(" ").map(Number);
let grid = inputs.slice(1).map((row) => row.split(""));

if (n % 2 === 0) {
  console.log("O".repeat(c).concat("\n").repeat(r).trim());
  process.exit(0);
}

if (n === 1) {
  console.log(grid.map((row) => row.join("")).join("\n"));
  process.exit(0);
}

let firstExplosion = Array.from({ length: r }, () => Array(c).fill("O"));
for (let i = 0; i < r; i++) {
  for (let j = 0; j < c; j++) {
    if (grid[i][j] === "O") {
      firstExplosion[i][j] = ".";
      [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ].forEach(([dx, dy]) => {
        const ni = i + dx;
        const nj = j + dy;
        if (ni >= 0 && ni < r && nj >= 0 && nj < c) {
          firstExplosion[ni][nj] = ".";
        }
      });
    }
  }
}

// Calculate the second explosion state (n=5)
let secondExplosion = Array.from({ length: r }, () => Array(c).fill("O"));
for (let i = 0; i < r; i++) {
  for (let j = 0; j < c; j++) {
    if (firstExplosion[i][j] === "O") {
      secondExplosion[i][j] = ".";
      [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ].forEach(([dx, dy]) => {
        const ni = i + dx;
        const nj = j + dy;
        if (ni >= 0 && ni < r && nj >= 0 && nj < c) {
          secondExplosion[ni][nj] = ".";
        }
      });
    }
  }
}

let result;
if (n % 4 === 3) {
  result = firstExplosion;
} else if (n % 4 === 1) {
  if (n === 1) {
    result = grid;
  } else {
    result = secondExplosion;
  }
}

console.log(result.map((row) => row.join("")).join("\n"));
