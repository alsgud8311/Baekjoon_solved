function solution(n, lost, reserve) {
  let realLost = lost
    .filter((value) => !reserve.includes(value))
    .sort((a, b) => a - b);
  let realReserve = reserve
    .filter((value) => !lost.includes(value))
    .sort((a, b) => a - b);

  let answer = n - realLost.length;

  for (i = 0; i < realLost.length; i++) {
    let lostNum = realLost[i];
    for (j = 0; j < realReserve.length; j++) {
      if (realReserve[j] - 1 === lostNum || realReserve[j] + 1 === lostNum) {
        answer++;
        realReserve[j] = -1;
        break;
      }
    }
  }

  return answer;
}
