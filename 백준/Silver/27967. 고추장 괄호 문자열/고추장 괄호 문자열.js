const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const [, ruined] = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n")
  .map((line) => line.split(""));

const isProperParen = (list) => {
  let balance = 0;
  for (const char of list) {
    if (char === "(") balance++;
    else if (char === ")") balance--;
    if (balance < 0) return false; // 닫는 괄호가 여는 괄호보다 많아지면 불가능
  }
  return balance === 0;
};

const restoreParentheses = (ruined, gochujang, index = 0) => {
  if (index === gochujang.length) {
    // 모든 고추장 위치를 처리한 경우
    return isProperParen(ruined) ? ruined.join("") : null;
  }

  // 고추장 위치에 여는 괄호("(") 넣기
  ruined[gochujang[index]] = "(";
  const result1 = restoreParentheses(ruined, gochujang, index + 1);
  if (result1) return result1;

  // 고추장 위치에 닫는 괄호(")") 넣기
  ruined[gochujang[index]] = ")";
  const result2 = restoreParentheses(ruined, gochujang, index + 1);
  if (result2) return result2;

  return null; // 올바른 문자열을 찾을 수 없는 경우
};

const gochujang = [];
ruined.forEach((paren, index) => {
  if (paren === "G") gochujang.push(index);
});

const result = restoreParentheses(ruined, gochujang);
console.log(result);
