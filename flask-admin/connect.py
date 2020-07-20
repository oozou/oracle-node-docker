import cx_Oracle
import db_config

con = cx_Oracle.connect(
    user=db_config.user,
    password=db_config.pw,
    dsn=db_config.dsn,
    mode=cx_Oracle.SYSDBA
)

print("Database version: ", con.version)
