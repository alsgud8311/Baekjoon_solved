with done as (select *
from USED_GOODS_BOARD
where STATUS="DONE")

select USER_ID, NICKNAME, TOTAL_SALES
from (select a.USER_ID, a.NICKNAME, SUM(PRICE) as TOTAL_SALES
from USED_GOODS_USER a join done on a.USER_ID=done.WRITER_ID
group by a.USER_ID) as a
where TOTAL_SALES >= 700000
ORDER BY TOTAL_SALES