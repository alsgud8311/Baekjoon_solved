const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const n = +require("fs").readFileSync(INPUT_FILE).toString().trim();
const chessBoard = Array.from({ length: n }, () => Array(n).fill(0));

let cnt = 0;

function backTracking(row) {
  if (row === n) {
    cnt++;
    return;
  }
  for (let col = 0; col < n; col++) {
    if (chessBoard[row][col] === 0) {
      queenMoves(row, col, 1);
      backTracking(row + 1);
      queenMoves(row, col, -1);
    }
  }
}

function queenMoves(r, c, delta) {
  for (let i = 0; i < n; i++) {
    chessBoard[r][i] += delta;
    chessBoard[i][c] += delta;
    if (r + i < n && c + i < n) chessBoard[r + i][c + i] += delta;
    if (r + i < n && c - i >= 0) chessBoard[r + i][c - i] += delta;
    if (r - i >= 0 && c + i < n) chessBoard[r - i][c + i] += delta;
    if (r - i >= 0 && c - i >= 0) chessBoard[r - i][c - i] += delta;
  }
  chessBoard[r][c] -= delta * 5;
}

backTracking(0);
console.log(cnt);
