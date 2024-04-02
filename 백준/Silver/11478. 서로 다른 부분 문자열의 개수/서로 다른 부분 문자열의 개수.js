const INPUT = require("fs").readFileSync("/dev/stdin").toString().trim();

result = new Set();
for (let i = 1; i < INPUT.length + 1; i++) {
  for (let j = 0; j < INPUT.length - i + 1; j++) {
    result.add(INPUT.substring(j, j + i));
  }
}

console.log(result.size);
