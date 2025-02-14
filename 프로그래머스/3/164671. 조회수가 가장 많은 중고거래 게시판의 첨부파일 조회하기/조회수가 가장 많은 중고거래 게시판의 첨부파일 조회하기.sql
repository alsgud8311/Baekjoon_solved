with bb as (select BOARD_ID from USED_GOODS_BOARD order by VIEWS desc limit 1)


SELECT CONCAT("/home/grep/src/",a.BOARD_ID,"/",a.FILE_ID,a.FILE_NAME,a.FILE_EXT) as FILE_PATH
FROM USED_GOODS_FILE a join bb on a.BOARD_ID=bb.BOARD_ID
order by a.FILE_ID desc
