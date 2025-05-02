const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

inputs.forEach((line) => {
  const yoot = line.split(" ").map(Number);
  let back = 0;
  for (let i = 0; i < yoot.length; i++) {
    if (yoot[i] === 1) {
      back++;
    }
  }
  switch (back) {
    case 0:
      console.log("D");
      break;
    case 1:
      console.log("C");
      break;
    case 2:
      console.log("B");
      break;
    case 3:
      console.log("A");
      break;
    case 4:
      console.log("E");
      break;
    default:
      break;
  }
});
