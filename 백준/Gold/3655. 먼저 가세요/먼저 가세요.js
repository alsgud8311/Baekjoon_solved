const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const q = require("fs").readFileSync(INPUT_FILE).toString().trim().split("\n");

for (let i = 1; i < q.length; i += 2) {
  const n = +q[i];
  const people = q[i + 1].split("");
  const last = {};
  people.forEach((person, idx) => {
    last[person] = idx;
  });
  people.sort((a, b) => last[a] - last[b]);
  const afterSort = {};
  people.forEach((person, idx) => {
    afterSort[person] = idx;
  });
  let cnt = {};
  people.forEach((person) => {
    cnt[person] = (cnt[person] || 0) + 1;
  });

  let acc = 0;
  for (const [key, val] of Object.entries(cnt)) {
    acc += (last[key] - afterSort[key]) * val * 5;
  }
  console.log(acc);
}
