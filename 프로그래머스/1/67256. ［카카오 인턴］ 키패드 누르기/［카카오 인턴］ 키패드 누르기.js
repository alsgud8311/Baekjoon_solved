function solution(numbers, hand) {
  const keypad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ["*", 0, "#"],
  ];
  let left = [3, 0],
    right = [3, 2];
  let result = "";
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] === 1 || numbers[i] === 4 || numbers[i] === 7) {
      left[0] = Math.floor(numbers[i] / 3);
      left[1] = 0;
      result += "L";
    } else if (numbers[i] === 3 || numbers[i] === 6 || numbers[i] === 9) {
      right[0] = Math.floor(numbers[i] / 3) - 1;
      right[1] = 2;
      result += "R";
    } else {
      let temp;
      if (numbers[i] === 0) {
        temp = [3, 1];
      } else {
        temp = [Math.floor(numbers[i] / 3), 1];
      }
      let distLeft = Math.abs(temp[0] - left[0]) + Math.abs(temp[1] - left[1]);
      let distRight =
        Math.abs(temp[0] - right[0]) + Math.abs(temp[1] - right[1]);
      console.log("걸림", numbers[i], distLeft, distRight, temp);
      if (distLeft === distRight) {
        if (hand === "right") {
          right[0] = temp[0];
          right[1] = temp[1];
          result += "R";
        } else {
          left[0] = temp[0];
          left[1] = temp[1];
          result += "L";
        }
      } else if (distLeft > distRight) {
        right[0] = temp[0];
        right[1] = temp[1];
        result += "R";
      } else {
        left[0] = temp[0];
        left[1] = temp[1];
        result += "L";
      }
    }
    console.log(left, right);
  }
  return result;
}
