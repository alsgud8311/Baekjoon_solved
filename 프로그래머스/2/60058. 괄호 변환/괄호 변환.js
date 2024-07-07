function solution(p) {
    p = Array.from(p)
    if(checkValid(p)) return p.join("");
    return balancing(p).join("")
    
}

function balancing(u) {
    if (u.length === 0) return [];
    let result = [];
    let splitIdx = checkFirstBalanced(u) + 1;
    let uu = u.slice(0,splitIdx);
    let v = u.slice(splitIdx);
    if (checkValid(uu)) {
        result = result.concat(uu);
        result = result.concat(balancing(v));
    } else{
        result.push("(");
        result = result.concat(balancing(v));
        result.push(")")
        result = result.concat(flip(uu.slice(1,uu.length-1)));
    }
    return result;
}

function checkFirstBalanced(w) {
    let left = 0;
    let right = 0;
    for(let i = 0; i<w.length; i++){
        if (w[i] === "(") left++;
        else right++;
        if (left === right) return i;
    }
}

function checkValid(u) {
    let stack = [];
    for (let i = 0; i < u.length; i++) {
        if (u[i] === ")") {
            if (stack.length === 0) return false;
            else stack.pop();
        } else {
            stack.push(u[i]);
        }
    }
    return stack.length === 0;
}

function flip(l) {
    return l.map((l) => {
        if (l === "(") return ")";
        else return "(";
    })
}