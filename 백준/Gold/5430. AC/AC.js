const inputs = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const tests = [];
for (let i = 1; i < inputs.length; i += 3) {
  const test = { reversed: false };
  test.fn = Array.from(inputs[i]);
  test.count = +inputs[i + 1];
  test.arr = JSON.parse(inputs[i + 2]);
  tests.push(test);
}

tests.forEach((test) => {
  for (let i = 0; i < test.fn.length; i++) {
    if (test.fn[i] === "R") {
      test.reversed = !test.reversed;
    } else if (test.fn[i] === "D") {
      if (!test.arr.length) {
        console.log("error");
        return;
      }
      if (test.reversed) {
        test.arr.pop();
      } else {
        test.arr.shift();
      }
    }
  }
  test.reversed
    ? console.log("[" + test.arr.reverse().join(",") + "]")
    : console.log("[" + test.arr.join(",") + "]");
});
