const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const [a, b] = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const [n, s] = a.split(" ").map(Number);
const nums = b.split(" ").map(Number);

let cnt = 0;
function backTracking(contain, k) {
  if (k === nums.length) {
    if (
      contain.length > 0 &&
      contain.reduce((curr, acc) => curr + acc, 0) === s
    ) {
      cnt++;
    }
    return;
  }

  const temp = nums[k];
  backTracking([...contain, temp], k + 1);
  backTracking([...contain], k + 1);
}

backTracking([], 0);
console.log(cnt);
