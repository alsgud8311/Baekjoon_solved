const input = require("fs").readFileSync("/dev/stdin").toString().trim();

let reverseInput = input.split("").reverse().join("");

if (reverseInput == input) {
  console.log(reverseInput.length);
  return;
}

for (let i = 1; i < input.length; i++) {
  let arr = input.split("").slice(i).join("");
  const reverseArray = input.split("").slice(i).reverse().join("");
  if (arr === reverseArray) {
    console.log(input.length + i);
    break;
  }
}
