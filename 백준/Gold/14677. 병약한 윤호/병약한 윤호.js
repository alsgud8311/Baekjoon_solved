const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const [a, meds] = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

const day = +a;
const order = ["B", "L", "D"];
const medicine = meds.split("");

let max = 0;
const queue = [[0, 0, medicine.length - 1]];
const visited = new Set(); // (ggini, left, right) 상태 저장

while (queue.length) {
  const [ggini, left, right] = queue.shift();
  max = Math.max(max, ggini);

  if (ggini / 3 === day || left > right) continue;
  
  // 방문한 상태인지 체크
  const stateKey = `${ggini},${left},${right}`;
  if (visited.has(stateKey)) continue;
  visited.add(stateKey);

  if (order[ggini % 3] === medicine[left]) {
    queue.push([ggini + 1, left + 1, right]);
  }
  if (order[ggini % 3] === medicine[right]) {
    queue.push([ggini + 1, left, right - 1]);
  }
}

console.log(max);
