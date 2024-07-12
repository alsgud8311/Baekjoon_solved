function solution(picks, minerals) {
    let tiredTable = {
        diamond: { iron: 1, diamond: 1, stone: 1 },
        iron: { iron: 1, diamond: 5, stone: 1 },
        stone: { iron: 5, diamond: 25, stone: 1 }
    };

    let tireds = [];
    let answer = Infinity;
    minerals = minerals.reverse()
    for (let i = 0; i < picks.length; i++) {
        if (picks[i] > 0) {
            let newPick;
            if (i === 0) newPick = "diamond";
            else if (i === 1) newPick = "iron";
            else if (i === 2) newPick = "stone";

            let newPicks = [...picks];
            newPicks[i]--;
            dfs(tiredTable, newPicks, tireds, 0, 5, newPick, [...minerals]);
        }
    }

    if (tireds.length > 0) {
        answer = Math.min(...tireds);
    }

    return answer;
}

function dfs(tiredTable, picks, tireds, currTired, leftPicks, currPick, leftMinerals) {
    if (leftMinerals.length === 0 || (leftPicks === 0 && picks.every(pick => pick === 0))) {
        tireds.push(currTired);
        return;
    }

    if (leftPicks > 0) {
        let newLeftMinerals = [...leftMinerals];
        let picked = newLeftMinerals.pop();
        dfs(tiredTable, [...picks], tireds, currTired + tiredTable[currPick][picked], leftPicks - 1, currPick, newLeftMinerals);
    } else {
        for (let i = 0; i < picks.length; i++) {
            if (picks[i] > 0) {
                let newPick;
                if (i === 0) newPick = "diamond";
                else if (i === 1) newPick = "iron";
                else if (i === 2) newPick = "stone";

                let newPicks = [...picks];
                newPicks[i]--;
                dfs(tiredTable, newPicks, tireds, currTired, 5, newPick, [...leftMinerals]);
            }
        }
    }
}


