select DISTINCT b.ID, b.EMAIL, b.FIRST_NAME, b.LAST_NAME
from (select * from SKILLCODES where CATEGORY="Front End")  a 
join DEVELOPERS b
on a.CODE & b.SKILL_CODE = a.CODE
order by b.ID