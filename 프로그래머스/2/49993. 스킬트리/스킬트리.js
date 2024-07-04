function solution(skill, skill_trees) {
    let answer = 0;
    for (let i = 0; i < skill_trees.length; i++) {
        if (isPossible(skill, skill_trees[i])) {
            answer++;
        }
    }
    return answer;
}

const isPossible = (prev, skills) => {
    let skillQueue = Array.from(prev);
    for (let i = 0; i < skills.length; i++) {
        if (skillQueue.includes(skills[i])) {
            if (skills[i] !== skillQueue[0]) {
                return false;
            }
            skillQueue.shift();
        }
    }
    return true;
}

