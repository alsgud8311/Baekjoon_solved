
function solution(coin, cards) {
    const n = cards.length;
    const targetNum = n+1;
    const arr = new Array(n/2+1).fill(0);
    const able = [];
    
    const putCard = (arr,card) => {
        if(card>n/2) arr[targetNum-card] +=1;
        else arr[card]+=1;
    }
    
    const updateAble = (card,memo,initial,able) => {
        const num = card > n/2 ? n+1 - card : card
        if(memo[num]===2) able.push([num,2-initial[num]])
        able.sort((a,b) => b[1]-a[1])
    }
    
    for(let i=0; i<n/3; i++) putCard(arr,cards[i]);
    
    let round = 1;
    const init = [...arr];

    for (let i = 1 ; i < arr.length ; i++){
        if(arr[i]===2) able.push([i,0])
    }
    
    //라운드 진행
    for(let i = n/3; i < n; i+=2){
        putCard(arr,cards[i])
        putCard(arr,cards[i+1])
        updateAble(cards[i],arr,init,able)
        updateAble(cards[i+1],arr,init,able)

        if(!able.length) return round
        coin -= able.pop()[1]
        if (coin < 0) return round;
        round++;
    }
    return round;
}
