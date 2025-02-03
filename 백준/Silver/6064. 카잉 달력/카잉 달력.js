const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const [t, ...rest] = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

function gcd(a, b) {
  while (b !== 0) {
    const r = a % b;
    a = b;
    b = r;
  }
  return a;
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function findYear(M, N, x, y) {
  const maxYear = lcm(M, N);

  let year = x;
  while (year <= maxYear) {
    if (year === 0) {
      if (y === 0 && x === 0) return maxYear;
    } else if (year % N === y || (year % N === 0 && y === N)) {
      return year;
    }
    year += M;
  }

  return -1;
}

rest.forEach((input) => {
  const [M, N, x, y] = input.split(" ").map(Number);
  console.log(findYear(M, N, x, y));
});
