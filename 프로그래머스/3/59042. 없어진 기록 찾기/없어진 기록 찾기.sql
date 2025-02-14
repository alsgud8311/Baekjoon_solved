select b.ANIMAL_ID, b.NAME
from ANIMAL_INS as a right outer join ANIMAL_OUTS as b on a.ANIMAL_ID = b.ANIMAL_ID
WHERE a.ANIMAL_ID is null
order by b.ANIMAL_ID