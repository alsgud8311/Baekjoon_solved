select a.ANIMAL_ID, a.NAME
FROM ANIMAL_INS as a RIGHT join ANIMAL_OUTS as b on b.ANIMAL_ID = a.ANIMAL_ID
WHERE a.ANIMAL_ID is not null
order by DATEDIFF(b.DATETIME, a.DATETIME) DESC
LIMIT 2