function solution(users, emoticons) {
  var answer = [0, 0];
  var discount = [];
  const calc = () => {
    let total = [0, 0];
    users.map((user) => {
      const [ratio, maxPrice] = user;
      let totalPrice = 0;
      emoticons.map((emoticon, idx) => {
        // 유저가 구매할 할인율보다 높거나 같으면 구매
        if (discount[idx] >= ratio) {
          totalPrice += emoticon * (1 - 0.01 * discount[idx]);
        }
        // 총 이모티콘 구매 가격이 유저가 생각한 최고금액보다 높으면 이모티콘 플러스 구매
      });
      if (totalPrice >= maxPrice) {
        totalPrice = 0;
        ++total[0];
      }
      total[1] += totalPrice;
    });
    if (
      answer[0] < total[0] ||
      (answer[0] === total[0] && answer[1] < total[1])
    )
      answer = [...total];
  };
  const DFS = (count) => {
    if (count === emoticons.length) {
      calc();
      return;
    }
    for (let i = 40; i >= 10; i -= 10) {
      discount[count] = i;
      DFS(count + 1);
    }
  };
  DFS(0);
  return answer;
}
