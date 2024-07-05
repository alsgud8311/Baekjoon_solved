function solution(n, computers) {
    var answer = 0;
    var computerSet = new Set();
    for(let i= 0; i<computers.length;i++){
        answer += dfs(i, n, computers, 0, computerSet);
    }
    return answer +  n - computerSet.size;
}

function dfs(com, n, computers, answer, computerSet) {
    for (let i = 0 ; i< n;i++){
        if (com !== i && computers[com][i] === 1){
            computers[com][i] = 0;
            computerSet.add(com).add(i);
            answer++;
            dfs(i,n,computers,answer,computerSet);
        }
    }
    return answer;
}