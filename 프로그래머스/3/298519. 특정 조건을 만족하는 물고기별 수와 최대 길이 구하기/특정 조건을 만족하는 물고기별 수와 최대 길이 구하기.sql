with a as (select FISH_TYPE, case when LENGTH is null then 10 else LENGTH end as LENGTH from FISH_INFO)

select COUNT(*) FISH_COUNT, MAX(LENGTH) MAX_LENGTH,FISH_TYPE
from a
group by FISH_TYPE having AVG(LENGTH) >= 33
order by FISH_TYPE