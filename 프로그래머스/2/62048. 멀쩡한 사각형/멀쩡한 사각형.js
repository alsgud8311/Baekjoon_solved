// function getDisabledSquare(w,h) {
//     const {middleX, middleY} = getMiddlePoint(w,h);
//     if(Number.isInteger(middleX)&&Number.isInteger(middleY)) {
//          const right = getDisabledSquare(middleX,middleY)
//          const left = getDisabledSquare(w-middleX,h-middleY)
//          return left + right
//     } else {
//         return  4
//     }
// }

// const getMiddlePoint = (w,h) => {
//     return {middleX: w/2, middleY: h/2}
// }

// function solution(w, h) {
//     const allSquare = w*h
//     const answer = 0;
//     const disabledSquare = getDisabledSquare(w,h,answer)
//     if(allSquare - disabledSquare < 0){
//      return  0    
//     }else{
//      return allSquare - disabledSquare   
//     }
// }

function gcd(a, b) {
    // 최대공약수 계산 (유클리드 호제법)
    if (b === 0) return a;
    return gcd(b, a % b);
}

function solution(w, h) {
    const allSquares = w * h; // 전체 정사각형 개수
    const disabledSquares = w + h - gcd(w, h); // 대각선이 지나는 정사각형의 개수
    return allSquares - disabledSquares; // 사용할 수 있는 정사각형의 개수
}
