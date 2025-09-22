const INPUT_FILE = process.platform === "linux" ? "/dev/stdin" : "./inputs.txt";
const inputs = require("fs")
  .readFileSync(INPUT_FILE)
  .toString()
  .trim()
  .split("\n");

const [N, M] = inputs[0].split(" ").map(Number);

const song = Array(N).fill(0n); // BigInt 배열

function bitCnt(x) {
  let cnt = 0;
  for (let i = 0; i < Math.max(N, M); i++) {
    cnt += Number((x >> BigInt(i)) & 1n);
  }
  return cnt;
}

for (let i = 0; i < N; i++) {
  const parts = inputs[i + 1].split(" ");
  const s = parts[1];
  
  for (let j = M - 1; j >= 0; j--) {
    song[i] = (song[i] << 1n) | (s[j] === 'Y' ? 1n : 0n);
  }
}

let state = { guitarNum: -1, songNum: 0 };

for (let tmp = 0; tmp < (1 << N); tmp++) {
  let comb = 0n;
  
  for (let i = 0; i < N; i++) {
    if (tmp & (1 << i)) {
      comb |= song[i];
    }
  }
  
  const guitarNum = bitCnt(BigInt(tmp));
  const songNum = bitCnt(comb);
  
  if (songNum > state.songNum) {
    state.guitarNum = guitarNum;
    state.songNum = songNum;
  } else if (songNum === state.songNum && guitarNum < state.guitarNum) {
    state.guitarNum = guitarNum;
  }
}

console.log(state.songNum === 0 ? -1 : state.guitarNum);