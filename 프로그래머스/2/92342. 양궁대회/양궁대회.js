function solution(n, info) {
  let answer = Array(11).fill(0);
  let maxCnt = 0;
  const dp = (apeach, ryan, shots, point, arr) => {
    if (n < shots) return;
    if (point > 10) {
      let diff = ryan - apeach;
      if (maxCnt < diff) {
        arr[10] = n - shots;
        maxCnt = diff;
        answer = arr;
      }
      return;
    }
    if (n > shots) {
      let curr = [...arr];
      curr[10 - point] = info[10 - point] + 1;
      dp(apeach, ryan + point, shots + info[10 - point] + 1, point + 1, curr);
    }
    if (info[10 - point] > 0) {
      dp(apeach + point, ryan, shots, point + 1, arr);
    } else {
      dp(apeach, ryan, shots, point + 1, arr);
    }
  };
  dp(0, 0, 0, 0, answer);
  return maxCnt <= 0 ? [-1] : answer;
}
