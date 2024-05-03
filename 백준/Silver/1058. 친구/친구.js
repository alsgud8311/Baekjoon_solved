let input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const N = parseInt(input.shift());

let friends = [];
for (let i = 0; i < N; i++) {
  friends.push(input[i].split(""));
}

let connect = Array.from(new Array(N), (_) => new Array(N).fill(0));
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    for (let l = 0; l < N; l++) {
      if (
        i !== j &&
        (friends[i][j] === "Y" ||
          (friends[i][l] === "Y" && friends[l][j] == "Y"))
      ) {
        connect[i][j] = 1;
      }
    }
  }
}

let answer = 0;
for (let i = 0; i < N; i++) {
  let count = connect[i].reduce((acc, val) => acc + val, 0);
  answer = Math.max(answer, count);
}

console.log(answer);
