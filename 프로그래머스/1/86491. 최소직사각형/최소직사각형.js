function solution(sizes) {
  let heights = [];
  let maxwidth = 0;
  for (let i = 0; i < sizes.length; i++) {
    if (sizes[i][0] < sizes[i][1]) {
      [[sizes[i][0], sizes[i][1]]] = [[sizes[i][1], sizes[i][0]]];
    }
    if (maxwidth < sizes[i][0]) maxwidth = sizes[i][0];
  }
  sizes.forEach((arr) => heights.push(arr[1]));
  let maxHeight = Math.max(...heights);
  return maxwidth * maxHeight; // 중간값과 최댓값 곱하기
}
