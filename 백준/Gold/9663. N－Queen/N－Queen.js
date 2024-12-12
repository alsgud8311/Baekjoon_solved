let n = parseInt(require("fs").readFileSync("/dev/stdin").toString());
console.log(getQueens(n));

function getQueens(n) {
  let count = 0;
  const chessBoard = Array.from({ length: n }, () => new Array(n).fill(0));
  backtrack(0);
  return count;

  function backtrack(row) {
    if (row === n) {
      count++;
      return;
    }

    for (let col = 0; col < n; col++) {
      if (isSafe(chessBoard, row, col)) {
        chessBoard[row][col] = 1;
        backtrack(row + 1);
        chessBoard[row][col] = 0;
      }
    }
  }

  function isSafe(board, row, col) {
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 1) return false;
    }

    for (let i = 1; row - i >= 0 && col - i >= 0; i++) {
      if (board[row - i][col - i] === 1) return false;
    }

    for (let i = 1; row - i >= 0 && col + i < n; i++) {
      if (board[row - i][col + i] === 1) return false;
    }

    return true;
  }
}
