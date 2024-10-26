function solution(targets) {
    let missile = 0;
    let start = 0;
    let end = 0;
    targets.sort((a,b) => a[0] - b[0])
    targets.forEach((target) => {
        if(end <= target[0]) {
            missile++;
            start = target[0];
            end = target [1];
        } else{
            if(start < target[0]) start = target[0];
            if(end > target[1]) end = target[1];
        }
    })
    return missile
}