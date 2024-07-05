function solution(routes) {
    let answer = 0;
    let startPoint = -30001;
    routes.sort((a,b) => a[1] - b[1])

    for(const routePoint of routes) {
        if(routePoint[1] >= startPoint) {
            if(startPoint >= routePoint[0]) {
                continue;
            }else {
                startPoint = routePoint[1]
                answer ++;
                startPoint[1] = routePoint[1]
            }
        }
    }
    return answer
}
