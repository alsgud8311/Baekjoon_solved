with a as (select * from APPOINTMENT where APNT_YMD like "2022-05%")

select MCDP_CD "진료과 코드", count(MCDP_CD) "5월예약건수"
from a
group by MCDP_CD
order by count(MCDP_CD), MCDP_CD
