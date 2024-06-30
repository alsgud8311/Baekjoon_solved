function solution(board, moves) {
  var answer = 0;
  let basket = [];
  for (const move of moves) {
    for (let row = 0; row < board.length; row++) {
      if (board[row][move - 1] !== 0) {
        if (basket[basket.length - 1] === board[row][move - 1]) {
          basket.pop();
          answer += 2;
        } else basket.push(board[row][move - 1]);
        board[row][move - 1] = 0;
        break;
      }
    }
  }
  return answer;
}