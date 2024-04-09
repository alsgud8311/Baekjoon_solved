const input = require("fs")
  .readFileSync("./dev/stdin")
  .toString()
  .split(" ")
  .map(Number);

const [N, L, W, H] = input;

function binarySearch() {
  let result = 0;
  let left = 0;
  let right = Math.max(L, W, H);

  for (let i = 0; i < 100; i++) {
    let mid = (left + right) / 2;
    if (Math.floor(L / mid) * Math.floor(W / mid) * Math.floor(H / mid) >= N) {
      left = mid;
      result = mid;
    } else {
      right = mid;
    }
  }
  return result.toFixed(9);
}
let ans = binarySearch();
console.log(ans);
