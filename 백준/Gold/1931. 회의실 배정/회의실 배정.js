const [N, ...rest] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .split("\n");

const times = rest.map((time) => time.split(" ").map(Number));

const sorted = times.sort(([a1, a2], [b1, b2]) => {
  if (a2 === b2) return a1 - b1;
  return a2 - b2;
});

let meetings = 0;
let endtime = 0;
sorted.forEach(([start, end]) => {
  if (endtime <= start) {
    endtime = end;
    meetings++;
  }
});

console.log(meetings);
