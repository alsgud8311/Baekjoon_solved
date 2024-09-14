function solution(n) {
    let ans = []
    var answer = hanoi(n,1,2,3,ans);
    return ans;
}

//n -> 개수, from -> 출발 , by -> 거치는 구간 , to -> 목적지
function hanoi(n,from,by,to,ans) {
    if(n === 1){
        ans.push([from,to])
    } else{
        // 1 3 2
        hanoi(n-1,from,to,by,ans);
        ans.push([from,to])
        hanoi(n-1,by,from,to,ans);
    }
}