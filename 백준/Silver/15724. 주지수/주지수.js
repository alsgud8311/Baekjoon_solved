const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const [n, m] = inputs[0].split(" ").map(Number);
const land = [new Array(m + 1).fill(0)];
for (let i = 1; i < n + 1; i++) {
  land.push([0, ...inputs[i].split(" ").map(Number)]);
}
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= m; j++) {
    if (i > 1) {
      land[i][j] =
        land[i - 1][j] + land[i][j] + land[i][j - 1] - land[i - 1][j - 1];
    } else {
      land[i][j] = land[i][j] + land[i][j - 1];
    }
  }
}
for (let i = n + 2; i < inputs.length; i++) {
  const [x1, y1, x2, y2] = inputs[i].split(" ").map(Number);
  console.log(
    land[x2][y2] - land[x1 - 1][y2] - land[x2][y1 - 1] + land[x1 - 1][y1 - 1]
  );
}
