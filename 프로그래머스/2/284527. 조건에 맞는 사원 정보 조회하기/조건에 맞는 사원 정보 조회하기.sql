select SCORE, a.EMP_NO, EMP_NAME, POSITION, EMAIL
from HR_EMPLOYEES a join (select EMP_NO, SUM(SCORE) SCORE from HR_GRADE group by EMP_NO) c on a.EMP_NO=c.EMP_NO
order by SCORE desc
limit 1