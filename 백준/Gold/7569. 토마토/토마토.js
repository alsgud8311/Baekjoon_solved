const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
const [M, N, H] = input[0].split(" ").map(Number);

const tomato = [];
for (let i = 1; i < input.length; i += N) {
  tomato.push(input.slice(i, i + N).map((row) => row.split(" ").map(Number)));
}

let day = 0;
let changed = false;
let unexist = 0;
let riped = 0;
const location = [
  [0, 1, 0],
  [0, 0, 1],
  [0, -1, 0],
  [0, 0, -1],
  [-1, 0, 0],
  [1, 0, 0],
];

let queue = [];
for (let h = 0; h < H; h++) {
  for (let n = 0; n < N; n++) {
    for (let m = 0; m < M; m++) {
      if (tomato[h][n][m] === 1) queue.push([h, n, m, 0]);
      if (tomato[h][n][m] === -1) unexist++;
    }
  }
}

function bfs() {
  let pointer = 0;
  while (pointer < queue.length) {
    riped++;
    const [h, n, m, d] = queue[pointer];
    day = Math.max(day, d);
    for (const [dh, dn, dm] of location) {
      if (
        !(
          h + dh >= 0 &&
          m + dm >= 0 &&
          n + dn >= 0 &&
          h + dh < H &&
          m + dm < M &&
          n + dn < N &&
          tomato[h + dh][n + dn][m + dm] === 0
        )
      )
        continue;
      if (!changed) changed = true;
      tomato[h + dh][n + dn][m + dm] = 1;
      queue.push([h + dh, n + dn, m + dm, d + 1]);
    }
    pointer++;
  }
}
bfs();

if (unexist + riped !== M * N * H) console.log(-1);
else if (changed) {
  console.log(day);
} else {
  console.log(0);
}
