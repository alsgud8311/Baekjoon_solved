function solution(r1, r2) {
    var answer = 0;
    for (let i = 1; i < r2+1; i++){
        if(i < r1 ){
            answer += Math.floor(Math.sqrt(r2**2 - i**2)) - Math.ceil(Math.sqrt(r1**2 - i**2)) +1    
        } else{
            answer += Math.floor(Math.sqrt(r2**2 - i**2)+1)
        }
    }
    return answer * 4
}

