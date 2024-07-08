function solution(s) {
    var answer = [];
    if (s.length===1) return 1
    for (let i = 1; i <= Math.floor(s.length / 2); i++) { // 종료 조건 수정
        answer.push(zip(s, i));
    }
    return Math.min(...answer);
}

function zip(s, size) {
    let target = s.slice(0, size);
    s = s.slice(size);
    let count = 1;
    let fullCount = 0;

    while (s.length >= size) {
        if (target === s.slice(0, size)) {
            count++;
            s = s.slice(size);
        } else {
            if (count === 1) {
                fullCount += size;
            } else {
                fullCount += `${count}`.length + size;
            }
            count = 1;
            target = s.slice(0, size);
            s = s.slice(size);
        }
    }

    // 마지막 남은 문자열 처리
    if (count === 1) {
        fullCount += size;
    } else {
        fullCount += `${count}`.length + size;
    }
    fullCount += s.length; // 남아 있는 문자열 길이 추가

    return fullCount;
}

