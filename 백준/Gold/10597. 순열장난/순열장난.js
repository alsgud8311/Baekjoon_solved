const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs").readFileSync(INPUT_FILE).toString().trim();

function isValid(num, used) {
  return num >= 1 && num <= Math.min(inputs.length, 50) && !used.has(num);
}
// 백트래킹 함수
function backtrack(index, path, used) {
  // 문자열 끝에 도달했을 때
  if (index === inputs.length) {
    return path.length > 0 ? path : null;
  }

  for (let length = 1; length <= 2; length++) {
    if (index + length > inputs.length) continue;

    // 현재 위치에서 length만큼의 숫자 추출
    const num = parseInt(inputs.slice(index, index + length));

    // 유효한 숫자인지 확인
    if (isValid(num, used)) {
      // 현재 숫자를 사용했다고 표시
      const newUsed = new Set(used);
      newUsed.add(num);

      // 다음 단계로 진행
      const result = backtrack(index + length, [...path, num], newUsed);
      if (result) {
        return result;
      }
    }
  }
}

// 백트래킹 시작
const result = backtrack(0, [], new Set());

// 결과가 있고, 유효한 순열인지 확인
if (result) {
  const maxNum = Math.max(...result);
  const expectedSet = new Set(Array.from({ length: maxNum }, (_, i) => i + 1));
  const resultSet = new Set(result);

  // 1부터 maxNum까지의 모든 숫자가 정확히 한 번씩 사용되었는지 확인
  if (
    result.length === maxNum &&
    JSON.stringify([...expectedSet].sort()) ===
      JSON.stringify([...resultSet].sort())
  ) {
    console.log(result.join(" "));
  }
}
