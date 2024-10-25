function solution(land) {
    const oilMap = new Map();
    
    for (let row = 0; row < land.length; row++) {
        for (let col = 0; col < land[row].length; col++) {
            if (land[row][col]) {
                const oilRoad = [];
                const drilled = drilling(oilMap, land, row, col, oilRoad);

                oilRoad.forEach((oiledCol) => {
                    if (oilMap.has(oiledCol)) {
                        oilMap.set(oiledCol, oilMap.get(oiledCol) + drilled);
                    } else {
                        oilMap.set(oiledCol, drilled);
                    }
                });
            }
        }
    }

    let max = 0;
    for (let val of oilMap.values()) {
        if (max < val) max = val;
    }

    return max;
}

function drilling(oilMap, land, startRow, startCol, road) {
    const queue = [[startRow, startCol]];
    let oils = 0;

    while (queue.length > 0) {
        const [row, col] = queue.shift();

        if (land[row][col] === 0) continue;

        oils++;
        land[row][col] = 0;

        if (!road.includes(col)) road.push(col);

        if (row > 0 && land[row - 1][col]) queue.push([row - 1, col]);
        if (row < land.length - 1 && land[row + 1][col]) queue.push([row + 1, col]);
        if (col > 0 && land[row][col - 1]) queue.push([row, col - 1]);
        if (col < land[0].length - 1 && land[row][col + 1]) queue.push([row, col + 1]);
    }

    return oils;
}
