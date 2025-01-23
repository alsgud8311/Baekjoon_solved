const fs = require("fs");
const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = fs.readFileSync(INPUT_FILE).toString().trim().split("\n");

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];
const WORD = ["w", "o", "r", "d"];
function searchWord(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  let wordCount = 0;

  function dfs(r, c, wordIndex, dr, dc) {
    if (
      r < 0 ||
      r >= rows ||
      c < 0 ||
      c >= cols ||
      grid[r][c] !== WORD[wordIndex]
    ) {
      return;
    }
    if (wordIndex === 3) {
      wordCount++;
      return;
    }

    dfs(r + dr, c + dc, wordIndex + 1, dr, dc);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === WORD[0]) {
        for (const [dr, dc] of directions) {
          dfs(r + dr, c + dc, 1, dr, dc);
        }
      }
    }
  }

  return wordCount;
}

let lineIndex = 0;
const testCases = parseInt(inputs[lineIndex++]);

for (let t = 0; t < testCases; t++) {
  const [rows, cols] = inputs[lineIndex++].split(" ").map(Number);
  const grid = inputs
    .slice(lineIndex, lineIndex + rows)
    .map((row) => Array.from(row));

  const count = searchWord(grid);
  console.log(count);

  lineIndex += rows;
}
