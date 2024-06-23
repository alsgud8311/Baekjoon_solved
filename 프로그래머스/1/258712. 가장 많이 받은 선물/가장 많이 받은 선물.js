let giftLog = {};

function solution(friends, gifts) {
  // giftLog 초기화
  for (let i = 0; i < friends.length; i++) {
    giftLog[friends[i]] = {
      giftScore: 0,
      nextMonth: 0,
      friends: {},
    };
    for (let j = 0; j < friends.length; j++) {
      if (j != i) {
        giftLog[friends[i]].friends[friends[j]] = 0;
      }
    }
  }

  // gifts 배열 처리
  for (let i = 0; i < gifts.length; i++) {
    let [from, to] = gifts[i].split(" ");
    giftLog[from].friends[to] += 1;
    giftLog[from].giftScore += 1;
    giftLog[to].giftScore -= 1;
  }

  // nextMonth 계산 (중복 제거)
  let compared = new Set();
  for (let char in giftLog) {
    for (let char2 in giftLog[char].friends) {
      let pair = [char, char2].sort().join();
      if (compared.has(pair)) continue;
      compared.add(pair);
      if (giftLog[char].friends[char2] > giftLog[char2].friends[char]) {
        giftLog[char].nextMonth++;
      } else if (giftLog[char].friends[char2] < giftLog[char2].friends[char]) {
        giftLog[char2].nextMonth++;
      } else if (
        (giftLog[char].friends[char2] === 0 &&
          giftLog[char2].friends[char] === 0) ||
        giftLog[char].friends[char2] === giftLog[char2].friends[char]
      ) {
        if (giftLog[char].giftScore > giftLog[char2].giftScore) {
          giftLog[char].nextMonth++;
        } else if (giftLog[char].giftScore < giftLog[char2].giftScore) {
          giftLog[char2].nextMonth++;
        }
      }
    }
  }

  // 최대 nextMonth 값 찾기
  let max = 0;
  for (let char in giftLog) {
    if (giftLog[char].nextMonth > max) {
      max = giftLog[char].nextMonth;
    }
  }

  return max;
}
