
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
function solution(video_len, pos, op_start, op_end, commands) {
    let cur_s = convertToSec(pos)
    const end_s = convertToSec(video_len)

    if(is_inside_op(cur_s, op_start, op_end)){
        cur_s = convertToSec(op_end)
    }

    commands.forEach(command=>{
        if(command === 'next'){
            cur_s = next(cur_s, end_s)
        }else{
            cur_s = prev(cur_s, end_s)
        }
        if(is_inside_op(cur_s, op_start, op_end)){
           cur_s = convertToSec(op_end)
        }
    })


    return convertToFormatString(cur_s);
}

function next(cur_sec, end_sec){
    const result = cur_sec + 10

    if(result >= end_sec){
        return end_sec
    }
    return result
}

function prev(cur_sec){
    const result = cur_sec - 10
    if(result < 0){
        return 0
    }
    return result
}

function is_inside_op(cur_sec, op_start, op_end){
    const ops = convertToSec(op_start)
    const opend = convertToSec(op_end)
    return ops<= cur_sec && cur_sec <= opend
}

function convertToSec(formatString){
    const [m,s] = formatString.split(':').map(Number)

    return 60*m+s
}

function convertToFormatString(sec){
    const m = String(Math.floor(sec / 60)).padStart(2,"0")
    const s = String(sec % 60).padStart(2,"0")

    return m + ':' + s
}
