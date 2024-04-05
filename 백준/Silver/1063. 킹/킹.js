let input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

// 초기 위치 설정
let [king, stone, moves] = input[0].split(" ");

const moving = (pos, command) => {
  let [col, row] = pos;

  // 한 칸 오른쪽
  if (command === "R" && col < "H")
    col = String.fromCharCode(col.charCodeAt(0) + 1);
  // 한 칸 왼쪽
  if (command === "L" && col > "A")
    col = String.fromCharCode(col.charCodeAt(0) - 1);
  // 한 칸 아래
  if (command === "B" && row > "1")
    row = String.fromCharCode(row.charCodeAt(0) - 1);
  // 한 칸 위로
  if (command === "T" && row < "8")
    row = String.fromCharCode(row.charCodeAt(0) + 1);

  // 대각선 움직임
  if (command === "RT" && col < "H" && row < "8") {
    col = String.fromCharCode(col.charCodeAt(0) + 1);
    row = String.fromCharCode(row.charCodeAt(0) + 1);
  }
  if (command === "LT" && col > "A" && row < "8") {
    col = String.fromCharCode(col.charCodeAt(0) - 1);
    row = String.fromCharCode(row.charCodeAt(0) + 1);
  }
  if (command === "RB" && col < "H" && row > "1") {
    col = String.fromCharCode(col.charCodeAt(0) + 1);
    row = String.fromCharCode(row.charCodeAt(0) - 1);
  }
  if (command === "LB" && col > "A" && row > "1") {
    col = String.fromCharCode(col.charCodeAt(0) - 1);
    row = String.fromCharCode(row.charCodeAt(0) - 1);
  }

  return col + row;
};

// 움직임 계산 및 결과 출력
for (let i = 1; i <= moves; i++) {
  const newKing = moving(king, input[i]);
  if (newKing === stone) {
    const newStone = moving(stone, input[i]);
    if (
      newStone[0] >= "A" &&
      newStone[0] <= "H" &&
      newStone[1] >= "1" &&
      newStone[1] <= "8" &&
      newStone !== newKing
    ) {
      king = newKing;
      stone = newStone;
    }
  } else {
    if (
      newKing[0] >= "A" &&
      newKing[0] <= "H" &&
      newKing[1] >= "1" &&
      newKing[1] <= "8"
    ) {
      king = newKing;
    }
  }
}

console.log(king);
console.log(stone);
