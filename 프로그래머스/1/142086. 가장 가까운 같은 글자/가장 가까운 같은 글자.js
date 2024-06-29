function solution(s) {
  var answer = [-1];
  for (let i = 1; i < s.length; i++) {
    if (s.slice(0, i).lastIndexOf(s[i]) !== -1)
      answer.push(i - s.slice(0, i).lastIndexOf(s[i]));
    else answer.push(s.slice(0, i).lastIndexOf(s[i]));
  }
  return answer;
}