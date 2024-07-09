function solution(new_id) {
    let regex = /^(?!.*\.\.)(?!.*\.$)(?!^\.)[a-z0-9._-]{3,15}$/;
    
    if(!regex.test(new_id)){
        new_id = new_id.toLowerCase();
        new_id = remove(new_id);
        new_id = removePoint(new_id);
        if (new_id.length === 0) new_id = 'a'  
        while(new_id.length < 3){
            new_id += new_id[new_id.length-1]
        }
    }
    if (new_id.length > 15){
        new_id = new_id.slice(0,15)
        if (new_id[new_id.length-1] === '.') new_id = new_id.slice(0,14)
    }
    return new_id;
}

function remove(s){
    let regex = /[a-z0-9._-]/
    let newString = ""
    for (let i = 0; i<s.length;i++){
        console.log(i)
        if(regex.test(s[i])) newString += s[i];
    }
    return newString;
}

function removePoint(s){
    while(s[0] === ".") s = s.slice(1)
    while (s[s.length-1] === ".") s= s.slice(0,s.length-1);
    for (let i =0;i<s.length;i++){
        if(s[i] === '.'){
            while (s[i+1] === ".") s= s.slice(0,i+1) + s.slice(i+2);
        }
    }
    return s
}