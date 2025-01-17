const inputs = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const coins = [200, 100, 50, 20, 10];
const coinNames = ["$2", "$1", "50c", "20c", "10c"];

const calculateImbalance = (coinList) => {
  const min = Math.min(...coinList);
  return coinList.reduce(
    (imbalance, count) => imbalance + (count - min) ** 2,
    0
  );
};

inputs.forEach((line, index) => {
  const [twoDollars, oneDollar, fiftyCents, twentyCents, tenCents, costInput] =
    line.split(" ");
  const coinList = [
    twoDollars,
    oneDollar,
    fiftyCents,
    twentyCents,
    tenCents,
  ].map(Number);
  const cost = Math.round(parseFloat(costInput.replace("$", "")) * 100);

  if (cost === 0) return;

  let remainingCost = cost;
  const change = Array(5).fill(0);

  while (remainingCost > 0) {
    let bestCoin = -1;
    let minImbalance = Infinity;

    for (let i = 0; i < coins.length; i++) {
      if (coinList[i] > 0 && remainingCost >= coins[i]) {
        coinList[i] -= 1;
        const newImbalance = calculateImbalance(coinList);
        if (newImbalance < minImbalance) {
          bestCoin = i;
          minImbalance = newImbalance;
        }
        coinList[i] += 1;
      }
    }

    if (bestCoin === -1) break;

    coinList[bestCoin] -= 1;
    change[bestCoin] += 1;
    remainingCost -= coins[bestCoin];
  }

  if (remainingCost > 0) {
    console.log(`Problem #${index + 1}: not possible`);
    return;
  }

  const result = [];
  for (let i = 0; i < change.length; i++) {
    if (change[i] > 0) {
      result.push(`${change[i]} ${coinNames[i]}`);
    }
  }

  const output =
    result.length > 1
      ? `${result.slice(0, -1).join(", ")} and ${
          result[result.length - 1]
        } coin(s)`
      : `${result[0]} coin(s)`;

  console.log(`Problem #${index + 1}: ${output}`);
});
