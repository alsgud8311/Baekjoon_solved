const fs = require("fs");

const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const input = fs.readFileSync(INPUT_FILE).toString().trim().split("\n");

const asciiPatterns = [
  `xxxxx\nx...x\nx...x\nx...x\nx...x\nx...x\nxxxxx`,
  `....x\n....x\n....x\n....x\n....x\n....x\n....x`,
  `xxxxx\n....x\n....x\nxxxxx\nx....\nx....\nxxxxx`,
  `xxxxx\n....x\n....x\nxxxxx\n....x\n....x\nxxxxx`,
  `x...x\nx...x\nx...x\nxxxxx\n....x\n....x\n....x`,
  `xxxxx\nx....\nx....\nxxxxx\n....x\n....x\nxxxxx`,
  `xxxxx\nx....\nx....\nxxxxx\nx...x\nx...x\nxxxxx`,
  `xxxxx\n....x\n....x\n....x\n....x\n....x\n....x`,
  `xxxxx\nx...x\nx...x\nxxxxx\nx...x\nx...x\nxxxxx`,
  `xxxxx\nx...x\nx...x\nxxxxx\n....x\n....x\nxxxxx`,
  `.....\n..x..\n..x..\nxxxxx\n..x..\n..x..\n.....`,
];

const asciiToCharMap = {};
asciiPatterns.forEach((pattern, index) => {
  asciiToCharMap[pattern] = index === 10 ? "+" : index.toString();
});

const ROWS = 7;
const COLS = 5;

const splitInput = [];
for (let i = 0; i < input[0].length; i += COLS + 1) {
  const block = [];
  for (let j = 0; j < ROWS; j++) {
    block.push(input[j].slice(i, i + COLS));
  }
  splitInput.push(block.join("\n"));
}

const expression = splitInput.map((block) => asciiToCharMap[block]).join("");
const [a, b] = expression.split("+").map(BigInt);

const result = (a + b).toString();

const charToAsciiMap = Object.fromEntries(
  asciiPatterns.map((pattern, index) => [
    index === 10 ? "+" : index.toString(),
    pattern,
  ])
);

const resultAscii = Array(ROWS).fill("");
for (const char of result) {
  const asciiBlock = charToAsciiMap[char].split("\n");
  for (let i = 0; i < ROWS; i++) {
    resultAscii[i] += (resultAscii[i] ? "." : "") + asciiBlock[i];
  }
}

console.log(resultAscii.join("\n"));
