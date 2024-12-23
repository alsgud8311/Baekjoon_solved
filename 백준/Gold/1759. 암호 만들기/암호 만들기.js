const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
const [L, C] = input[0].split(" ").map(Number);
const strings = input[1].split(" ");
const result = new Set();

function recurs(vo, co, pointer, combString) {
  if (combString.length === L) {
    if (vo >= 1 && co >= 2) {
      const comb = combString.sort().join("");
      result.add(comb);
    }
    return;
  }
  for (let i = pointer; i < strings.length; i++) {
    if (
      strings[i] === "a" ||
      strings[i] === "e" ||
      strings[i] === "i" ||
      strings[i] === "o" ||
      strings[i] === "u"
    ) {
      recurs(vo + 1, co, i + 1, [...combString, strings[i]]);
    } else {
      recurs(vo, co + 1, i + 1, [...combString, strings[i]]);
    }
  }
}

recurs(0, 0, 0, []);
Array.from(result)
  .sort()
  .forEach((r) => console.log(r));
