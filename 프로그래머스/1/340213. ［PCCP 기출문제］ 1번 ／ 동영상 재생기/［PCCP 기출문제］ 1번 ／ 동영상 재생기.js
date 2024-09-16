function solution(video_len, pos, op_start, op_end, commands) {
    let curr = convertToSecond(pos);
    const opStart = convertToSecond(op_start);
    const opEnd = convertToSecond(op_end);
    const full = convertToSecond(video_len);
    const commandList = {
        next: () => curr = next(opStart,opEnd,curr,full),
        prev: () => curr = curr-10 < 0 ? 0 : curr-10
    }
    
    curr = checkOpening(opStart,opEnd,curr);
    commands.forEach((command) => {
        commandList[command]();
        curr = checkOpening(opStart,opEnd,curr);
    })
    return convertToTime(curr);
}

function checkOpening(op_start,op_end,curr){
    if(op_start <= curr && op_end >= curr){
        return op_end;
    }
    return curr;
}

function next(op_start,op_end,curr,full){
    curr += 10;
    if (full <= curr) return full;
    return curr;
}


const convertToSecond = (time) => {
    [min,sec] = time.split(":").map((t)=>parseInt(t));
    return 60*min + sec;
}

const convertToTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2,"0")
    const s = String(sec % 60).padStart(2,"0")
    return `${m}:${s}`
}