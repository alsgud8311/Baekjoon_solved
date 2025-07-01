function solution(cards) {
  const n = cards.length;
  const visited = Array(n).fill(false);
  const groups = [];

  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;

    let cnt = 0;
    let current = i;

    while (!visited[current]) {
      visited[current] = true;
      current = cards[current] - 1;
      cnt++;
    }

    groups.push(cnt);
  }

  // 가장 큰 두 개의 그룹을 선택
  groups.sort((a, b) => b - a);

  return groups.length < 2 ? 0 : groups[0] * groups[1];
}
