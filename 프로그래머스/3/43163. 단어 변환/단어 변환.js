function solution(begin, target, words) {
    if (!words.includes(target)) return 0
    var answer = [];
    let usedWords = [];
    dfs(usedWords,target,begin,words,0,answer)
    answer.sort((a,b) => {
        return a-b;
    })
    console.log(usedWords)
    if(answer.length===0) return 0
    return answer[0];
}
function dfs(usedWords,target, currWord, words,count,answer) {
    let used = usedWords.slice();
    if (currWord === target) {
        answer.push(count);
        return;
    }
    for (const word of words){
        if(!used.includes(word) && countDiffChars(word,currWord) === 1){
            used.push(word);
            dfs(used, target, word, words, count+1,answer)
        }
    }
}
const countDiffChars = (word1,word2) => {
    let count = 0;
    for (const char in word2){
        if (word2[char] !== word1[char]) count++;
    }
    return count;
}