function solution(id_list, report, k) {
  let reportList = {};
  let banned = [];
  let result = [];
  for (let i = 0; i < id_list.length; i++) {
    reportList[id_list[i]] = {
      reported: 0,
      reportUser: new Set(),
      mail: 0,
    };
  }
  for (let i = 0; i < report.length; i++) {
    let [reporting, reported] = report[i].split(" ");
    let prevRep = reportList[reported].reportUser.size;
    reportList[reported].reportUser.add(reporting);
    if (prevRep !== reportList[reported].reportUser.size)
      reportList[reported].reported++;
  }
  for (const user in reportList) {
    if (reportList[user].reported >= k) {
      for (const mailUser of reportList[user].reportUser) {
        reportList[mailUser].mail++;
      }
    }
  }
  for (const user in reportList) {
    result.push(reportList[user].mail);
  }
  return result;
}

