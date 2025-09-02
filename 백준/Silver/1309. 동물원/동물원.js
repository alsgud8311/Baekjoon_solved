// 2*n 배열에 사자 배치
// 사자는 가로 세로 붙어있게 배치 X
// 이전 n-1 에서의 배열에서 가졌던 경우의 수에 2배

const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const n = +require("fs").readFileSync(INPUT_FILE).toString().trim();
const dpArr = new Array(n + 1).fill(0);
dpArr[0] = 1;
dpArr[1] = 3;
for (let i = 2; i <= n; i++) {
  // dpArr[n] -> 2 x n 배열일 때 가질 수 있는 사자 배치의 경우의 수
  // dpArr[i-1] 이전에 하나라도 있을 경우를 구해야 하기 때문에 이전 경우의 수에서 아무것도 배치 안하는 경우 제외
  // dpArr[i-2] 는 이전에 아무것도 없을 경우에서의 경우의 수
  // 하나라도 있을 경우 -> 각각에 하나씩 배치하는 경우 생각해서 x2
  // 아무것도 없을 경우 -> 이전칸 비어있고 각각에 하나씩 배치하기 때문에 x2
  dpArr[i] = (dpArr[i - 1] * 2 + dpArr[i - 2]) % 9901;
}
console.log(dpArr[n]);
