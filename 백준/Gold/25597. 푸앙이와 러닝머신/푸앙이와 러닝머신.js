const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
let [n, k] = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split(" ")
  .map(Number);

let res8 = 0,
  res4 = 0,
  res1 = 0;

// 최대한 8을 먼저 사용하는 전략
if (n >= 8) {
  res8 = Math.floor(n / 8);
  n %= 8;
}

// 나머지에서 4를 우선 사용
if (n >= 4) {
  res4 = Math.floor(n / 4);
  n %= 4;
}

// 나머지는 1로 채우기
res1 = n;

let sum = res1 + res4 + res8;
if (sum > k) {
  console.log("-1");
  return;
}

if (sum < k) {
  // k와 차이가 있을 경우 추가 조정
  if (res8 > 0 && k - sum >= res8) {
    res4 += res8 * 2;
    res8 = 0;
    sum = res4 + res1 + res8;
  }

  if (res4 > 0 && k - sum >= res4 * 3) {
    res1 += res4 * 4;
    res4 = 0;
    sum = res1 + res4 + res8;
  }
}

// 버튼 결과 배열을 준비
const vec = [];
if (res8 > 0) vec.push([8, res8]);
if (res4 > 0) vec.push([4, res4]);
if (res1 > 0) vec.push([1, res1]);

console.log(vec.length);
console.log(`${k - sum} ${vec[0][0]}`);

let time = k - sum + vec[0][1];
for (let i = 1; i < vec.length; i++) {
  console.log(`${time} ${vec[i][0]}`);
  time += vec[i][1];
}
