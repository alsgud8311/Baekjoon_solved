function solution(diffs, times, limit) {
    let left = 0;
    let right = 100000;
    let answer = Infinity;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (calTime(diffs, times, mid) <= limit) {
            if(answer > mid) answer = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    if(answer===0) return 1
    return answer
}

function calTime(diffs, times, level) {
    let result = 0;
    let time_prev = 0;
    
    diffs.forEach((diff, idx) => {
        if (diff > level) {
          result = result + (time_prev + times[idx]) * (diff - level);  
        } 
        result += times[idx];
        time_prev = times[idx];
        
    });
    return result;
}
