const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const students = +inputs[0];
const s = new Array(students).fill(Infinity);

//i가 중간고사 등수
//s[i]가 기말고사 등수
inputs[1].split(" ").forEach((student, i) => {
  s[student] = +student - (i + 1);
});
const result = s.slice(1).join("\n");
console.log(result);
