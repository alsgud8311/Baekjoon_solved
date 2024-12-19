const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const city = input.slice(1).map((row) => row.split(" ").map(Number));

const homes = [];
const stores = [];
function travelCity() {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (city[i][j] === 1) homes.push([i, j]);
      if (city[i][j] === 2) stores.push([i, j]);
    }
  }
}

travelCity();

let minDist = Infinity;
function backTracking(start, selected) {
  if (selected.length === M) {
    let totalDist = 0;
    homes.forEach((home) => {
      totalDist += calChickenDist(
        home,
        selected.map((idx) => stores[idx])
      );
    });
    minDist = Math.min(minDist, totalDist);
    return;
  }
  for (let c = start; c < stores.length; c++) {
    selected.push(c);
    backTracking(c + 1, selected);
    selected.pop();
  }
}

function calChickenDist(from, to) {
  const [r1, c1] = from;
  return Math.min(
    ...to.map(([r2, c2]) => Math.abs(r1 - r2) + Math.abs(c1 - c2))
  );
}

backTracking(0, []);
console.log(minDist);
