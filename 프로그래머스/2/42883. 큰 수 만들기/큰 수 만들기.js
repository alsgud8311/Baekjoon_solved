function solution(number, k) {
    let numberList = Array.from(String(number));
    let stack = [];
    for (let i=0;i<numberList.length;i++){
        while(k > 0 && stack[stack.length-1] < parseInt(numberList[i])){
            stack.pop();
            k--;
        } 
        stack.push(parseInt(numberList[i]));
    }
    while(k!==0){
        stack.pop();
        k--;
    }
    return stack.join("")
}