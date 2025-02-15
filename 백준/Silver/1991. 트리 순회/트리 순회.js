const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const [n, ...rest] = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");
const tree = {};
rest.forEach((r) => {
  const [a, b, c] = r.split(" ");
  tree[a] = [b, c];
});
let pre = "";
let inn = "";
let post = "";

function traversal(i, order) {
  if (i === ".") return;
  if (order === "pre") pre += i;
  if (tree[i][0]) {
    traversal(tree[i][0], order);
  }
  if (order === "in") inn += i;
  if (tree[i][1]) {
    traversal(tree[i][1], order);
  }
  if (order === "post") post += i;
}

traversal("A", "pre");
traversal("A", "in");
traversal("A", "post");

console.log(pre);
console.log(inn);
console.log(post);
