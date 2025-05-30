SELECT DISTINCT 
    A.ID, 
    A.GENOTYPE, 
    (SELECT GENOTYPE 
        FROM ECOLI_DATA 
        WHERE ID = A.PARENT_ID) AS PARENT_GENOTYPE
FROM 
    ECOLI_DATA A
WHERE 
    A.PARENT_ID IS NOT NULL 
    AND A.GENOTYPE & (
        SELECT GENOTYPE 
        FROM ECOLI_DATA 
        WHERE ID = A.PARENT_ID
    ) >= (
        SELECT GENOTYPE 
        FROM ECOLI_DATA 
        WHERE ID = A.PARENT_ID
    )
ORDER BY 
    A.ID ASC;
