function solution(relation) {
    var answer = 0;
    let col = makeCol(relation);
    let combination = [];
    
    for(let i = 1; i <= col.length; i++){
        dfs(i, 0, col, combination, Array.from({length: relation.length}, () => []), []);
    }
    
    return combination.length;
}

function makeCol(arr) {
    let col = [];
    for (let i = 0; i < arr[0].length; i++) {
        let tempCol = [];
        for (let j = 0; j < arr.length; j++) {
            tempCol.push(arr[j][i]);
        }
        col.push(tempCol);
    }
    return col;
}

function dfs(size, currSize, allCols, combinations, madeRel, selectedCol) {
    if(size === currSize) {
        let madeRelSet = new Set(madeRel.map((col) => col.join("")));
        if (madeRelSet.size === madeRel.length) {
            for (let comb of combinations) {
                if (comb.every(val => selectedCol.includes(val))) {
                    return;
                }
            }
            combinations.push([...selectedCol]);
        }
        return;
    }
    
    for (let i = 0; i < allCols.length; i++) {
        if (!selectedCol.includes(i)) {
            let newMadeRel = madeRel.map(row => row.slice());
            for (let j = 0; j < allCols[i].length; j++) {
                newMadeRel[j].push(allCols[i][j]);
            }
            dfs(size, currSize + 1, allCols, combinations, newMadeRel, [...selectedCol, i]);
        }
    }
}