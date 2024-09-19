function solution(rows, columns, queries) {
    let table = Array.from({ length: rows }, (_, i) => 
        Array.from({ length: columns }, (_, j) => i * columns + j + 1)
    );
    console.log(table);
    const answer = [];
    
    queries.forEach((query) => {
        const [x1, y1, x2, y2] = query;
        answer.push(rotate(x1 - 1, y1 - 1, x2 - 1, y2 - 1, table));
    });
    
    return answer;
}

function rotate(x1, y1, x2, y2, table) {
    let saved = table[x1][y1];
    let minValue = saved;
    
    // 상 (왼쪽에서 오른쪽으로 값을 왼쪽으로 이동)
    for (let i = y1; i < y2; i++) {
        const moving = table[x1][i + 1];
        table[x1][i + 1] = saved;
        saved = moving;
        minValue = Math.min(minValue, saved);
    }
    
    // 우 (위에서 아래로 값을 위로 이동)
    for (let i = x1; i < x2; i++) {
        const moving = table[i + 1][y2];
        table[i + 1][y2] = saved;
        saved = moving;
        minValue = Math.min(minValue, saved);
    }
    
    // 하 (오른쪽에서 왼쪽으로 값을 오른쪽으로 이동)
    for (let i = y2; i > y1; i--) {
        const moving = table[x2][i - 1];
        table[x2][i - 1] = saved;
        saved = moving;
        minValue = Math.min(minValue, saved);
    }
    
    // 좌 (아래에서 위로 값을 아래로 이동)
    for (let i = x2; i > x1; i--) {
        const moving = table[i - 1][y1];
        table[i - 1][y1] = saved;
        saved = moving;
        minValue = Math.min(minValue, saved);
    }
    
    return minValue;
}
