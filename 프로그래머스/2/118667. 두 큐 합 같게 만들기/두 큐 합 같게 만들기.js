function solution(queue1, queue2) {
    var answer = 0;
    let sum_1 = queue1.reduce((acc,cur) => acc+cur, 0)
    let sum_2 = queue2.reduce((acc,cur) => acc+cur, 0)
    let target;
    if ((sum_1 + sum_2) % 2 !== 0) return -1;
    else target = (sum_1 + sum_2) / 2
    let queue2_idx = 0;
    let queue1_idx = 0;
    let maxCnt = queue1.length + queue2.length;
    
    while (answer < maxCnt + 5){
        if (sum_1 === target) return answer
        else if (sum_1 < target) {
            sum_1 += queue2[queue2_idx];
            queue1.push(queue2[queue2_idx]);
            queue2_idx++;
        } else if (sum_1 > target) {
            sum_1 -= queue1[queue1_idx];
            queue2.push(queue1[queue1_idx]);
            queue1_idx++;
        }
        answer++;
    }
    return -1;
}