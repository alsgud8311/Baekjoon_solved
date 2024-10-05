function solution(s) {
    let answer = [];
    const nummap = new Map();
    let numstring = "";
    let open = false;

    for (let i = 1; i < s.length - 1; i++) {
        if (!isNaN(s[i])) { 
            numstring += s[i]; 
            open = true;
        } else if (open) { 
            let inNum = parseInt(numstring);
            nummap.has(inNum) 
                ? nummap.set(inNum, nummap.get(inNum) + 1) 
                : nummap.set(inNum, 1);
            numstring = "";
            open = false;
        }
    }

    answer = [...nummap.entries()]
        .sort((a, b) => b[1] - a[1]) 
        .map(([key, value]) => key); 

    return answer;
}
