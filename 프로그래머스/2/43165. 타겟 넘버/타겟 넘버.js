function solution(numbers, target) {
    let answer = dfs(numbers,target,0,0)
    return answer;
}

function dfs(numbers,target,acc,answer){
    let tempNumbers = numbers.slice()
    if (numbers.length === 0){
        if (acc === target) {
            answer++;
            return answer;
        }
        else return answer;
    }
    let popped = tempNumbers.pop();
    
    return dfs(tempNumbers,target,acc + popped, answer) + dfs(tempNumbers,target,acc-popped,answer);
    
}