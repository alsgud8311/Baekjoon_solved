const [N, r, c] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .split(" ")
  .map(Number);

function fillZ(val, loc, size) {
  let [locationX, locationY] = loc;
  if (size === 1) {
    if (locationX === r && locationY === c) {
      console.log(val);
    }
    return;
  }
  const halfSize = size / 2;
  const quadrantSize = halfSize * halfSize;

  if (locationX + halfSize <= r && locationY + halfSize <= c) {
    fillZ(
      val + quadrantSize * 3,
      [locationX + halfSize, locationY + halfSize],
      halfSize
    );
  } else if (locationX + halfSize <= r && locationY <= c) {
    fillZ(val + quadrantSize * 2, [locationX + halfSize, locationY], halfSize);
  } else if (locationX <= r && locationY + halfSize <= c) {
    fillZ(val + quadrantSize, [locationX, locationY + halfSize], halfSize);
  } else {
    fillZ(val, [locationX, locationY], halfSize);
  }
}

fillZ(0, [0, 0], 2 ** N);
