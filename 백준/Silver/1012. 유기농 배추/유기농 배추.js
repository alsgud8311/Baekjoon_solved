let input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
let num = Number(input.shift());

for (let i = 0; i < num; i++) {
  let [row, column, k] = input.shift().split(" ").map(Number);
  let worms = 0;
  let baechu = Array.from(Array(row), () => new Array(column).fill(0));
  function bfs(startx, starty) {
    const queue = [[startx, starty]];
    while (queue.length) {
      const [x, y] = queue.shift();
      if (!baechu[x][y]) continue;
      baechu[x][y] = 0;
      if (x + 1 < row && baechu[x + 1][y]) {
        queue.push([x + 1, y]);
      }
      if (y + 1 < column && baechu[x][y + 1]) {
        queue.push([x, y + 1]);
      }
      if (x - 1 >= 0 && baechu[x - 1][y]) {
        queue.push([x - 1, y]);
      }
      if (y - 1 >= 0 && baechu[x][y - 1]) {
        queue.push([x, y - 1]);
      }
    }
    return;
  }

  for (let j = 0; j < k; j++) {
    let [wormx, wormy] = input.shift().split(" ");
    baechu[wormx][wormy] = 1;
  }
  for (let m = 0; m < baechu.length; m++) {
    for (let n = 0; n < baechu[m].length; n++) {
      if (baechu[m][n]) {
        bfs(m, n);
        worms++;
      }
    }
  }
  console.log(worms);
}
