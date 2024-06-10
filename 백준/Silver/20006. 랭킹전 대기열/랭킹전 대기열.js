let input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

let [p, m] = input.shift().split(" ").map(Number);
let room = [];
for (let k = 0; k < p; k++) {
  let [l, n] = input.shift().split(" ");
  l = parseInt(l);
  if (room.length === 0) {
    room.push([[l, n]]);
  } else {
    let entered = false;
    for (let i = 0; i < room.length; i++) {
      if (Math.abs(room[i][0][0] - l) <= 10 && room[i].length < m) {
        room[i].push([l, n]);
        entered = true;
        break;
      }
    }
    if (!entered) room.push([[l, n]]);
  }
}

for (let j = 0; j < room.length; j++) {
  room[j].sort((a, b) => a[1].localeCompare(b[1]));
  if (room[j].length === m) {
    console.log("Started!");
  } else {
    console.log("Waiting!");
  }
  for (let k = 0; k < room[j].length; k++) {
    console.log(`${room[j][k][0]} ${room[j][k][1]}`);
  }
}
