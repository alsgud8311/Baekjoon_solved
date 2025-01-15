const inputs = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const t = +inputs[0];
for (let i = 1; i < t + 1; i++) {
  const [R, n] = inputs[i].split(" ").map(Number);
  console.log(`Scenario #${i}:`);
  const result = (R * Math.sin(Math.PI / n)) / (1 + Math.sin(Math.PI / n));
  console.log(result.toFixed(3));
  console.log();
}
