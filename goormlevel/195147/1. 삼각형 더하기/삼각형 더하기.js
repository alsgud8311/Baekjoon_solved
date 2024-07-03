const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input1;
let board = [];
let answer = 0;
let inputCount = 0;

rl.on('line', (line) => {
  if (!input1) {
    input1 = line.split(' ').map(Number);
  } else if (inputCount < input1[0]) {
    board.push(line.split(' ').map(Number));
    inputCount++;
  } else {
    const input2 = line.split(' ').map(num => Number(num) - 1);

    let points = [
      { y: input2[0], x: input2[1] },
      { y: input2[2], x: input2[3] },
      { y: input2[4], x: input2[5] }
    ];

    points.sort((a, b) => a.y === b.y ? a.x - b.x : a.y - b.y);

    let value = [];
    let x = [points[0].x, points[1].x, points[2].x];
    let y = [points[0].y, points[1].y, points[2].y];

    let xMin = x[0];
    let xMax = x[1];

    if (x[0] === x[1] && y[1] === y[2]) {
      for (let yi = y[0]; yi <= y[2]; yi++) {
        value = value.concat(board[yi].slice(x[0], xMax + 1));
        xMax++;
      }
    } else if (x[1] === x[2] && y[0] === y[1]) {
      for (let yi = y[0]; yi <= y[2]; yi++) {
        value = value.concat(board[yi].slice(xMin, x[1] + 1));
        xMin++;
      }
    } else if (x[0] === x[2] && y[0] === y[1]) {
      for (let yi = y[0]; yi <= y[2]; yi++) {
        value = value.concat(board[yi].slice(x[0], xMax + 1));
        xMax--;
      }
    } else if (x[0] === x[2] && y[1] === y[2]) {
      for (let yi = y[0]; yi <= y[2]; yi++) {
        value = value.concat(board[yi].slice(xMin, x[0] + 1));
        xMin--;
      }
    }

    answer = value.reduce((acc, curr) => acc + curr, 0);
    console.log(answer);
  }
});
