function solution(today, terms, privacies) {
  let [todayYear, todayMon, todayDay] = today.split(".").map(Number);
  let termsList = {};
  let result = [];
  for (let i = 0; i < terms.length; i++) {
    let [term, mon] = terms[i].split(" ");
    termsList[term] = parseInt(mon);
  }
  for (let i = 0; i < privacies.length; i++) {
    let [date, term] = privacies[i].split(" ");
    let [newYear, newMon, newDay] = date.split(".").map(Number);
    if (newDay - 1 === 0) {
      newDay = 28;
      newMon--;
    } else newDay--;
    if (newMon + termsList[term] > 12) {
      newYear += Math.floor((newMon + termsList[term]) / 12);
      if ((newMon + termsList[term]) % 12 === 0) {
        newMon = 12;
        newYear--;
      } else newMon = (newMon + termsList[term]) % 12;
    } else newMon += termsList[term];

    if (todayYear > newYear) result.push(i + 1);
    else if (todayYear === newYear && todayMon > newMon) result.push(i + 1);
    else if (todayYear === newYear && todayMon === newMon && todayDay > newDay)
      result.push(i + 1);
  }
  return result;
}
