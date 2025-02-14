const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const n = +require("fs").readFileSync(INPUT_FILE).toString().trim();

function printStar(c) {
  if (c === 3) return ["***", "* *", "***"];

  const star = printStar(c / 3);
  const size = star.length;
  const result = [];

  for (let i = 0; i < 3 * size; i++) {
    if (Math.floor(i / size) === 1) {
      result.push(star[i % size] + " ".repeat(size) + star[i % size]);
    } else {
      result.push(star[i % size].repeat(3));
    }
  }

  return result;
}

console.log(printStar(n).join("\n"));
