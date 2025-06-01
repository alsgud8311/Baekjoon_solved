const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const maps = inputs.slice(1).map((l) => Array.from(l));
const [R, C, K] = inputs[0].split(" ").map(Number);
const dLoc = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const queue = [[R - 1, 0, 1, [[R - 1, 0]]]];
let result = 0;
while (queue.length) {
  const [r, c, d, v] = queue.shift();
  if (r === 0 && c === C - 1 && d === K) {
    result++;
    continue;
  }
  for (const [dr, dc] of dLoc) {
    const nr = r + dr;
    const nc = c + dc;
    if (
      nr < 0 ||
      nr >= R ||
      nc < 0 ||
      nc >= C ||
      maps[nr][nc] === "T" ||
      d + 1 > K ||
      v.some(([vr, vc]) => vr === nr && vc === nc)
    )
      continue;
    const newVisited = [...v, [nr, nc]];
    queue.push([nr, nc, d + 1, newVisited]);
  }
}
console.log(result);
