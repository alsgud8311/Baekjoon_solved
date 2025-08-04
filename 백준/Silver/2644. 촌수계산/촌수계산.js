const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";

const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

const visited = Array.from({ length: +inputs[0] + 1 }, () =>
  new Array(+inputs[0] + 1).fill(false)
);
const [from, to] = inputs[1].split(" ").map(Number);
const fam = {};
inputs.slice(3).forEach((r) => {
  const [f, t] = r.split(" ").map(Number);
  if (fam[f]) fam[f].push(t);
  else fam[f] = [t];
  if (fam[t]) fam[t].push(f);
  else fam[t] = [f];
});

let min = Infinity;
function dfs(from, to, d) {
  if (from === to) {
    min = Math.min(min, d - 1);
  }
  for (let i = 0; i < fam[from].length; i++) {
    const newFrom = fam[from][i];
    if (!visited[newFrom][to]) {
      visited[newFrom][to] = true;
      dfs(newFrom, to, d + 1);
    }
  }
}

if (!fam[from] || !fam[to]) console.log(-1);
else {
  dfs(from, to, 1);
}

console.log(min === Infinity ? -1 : min);
