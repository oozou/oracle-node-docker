const fs = require("fs");
const oracledb = require("oracledb");
const dotenv = require("dotenv");
const path = require('path');

const envPath = path.join(__dirname, '.env');

if (!fs.existsSync(envPath)) {
  console.error(
    "Please create a .env file before running database operations."
  );

  process.exit(1);
}

dotenv.config({ path: envPath });

(async () => {
  try {
    const connection = await oracledb.getConnection({
      user: process.env.DB_SYSTEM_USER,
      password: process.env.DB_SYSTEM_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
      privilege: oracledb.SYSDBA,
    });

    await connection.execute(`ALTER SESSION SET "_ORACLE_SCRIPT"=true`);

    const result = await connection.execute(
      `SELECT COUNT (1) FROM dba_users WHERE username = '${process.env.DB_USER.toUpperCase()}'`
    );

    if (result.rows && result.rows[0][0] === 1) {
      await connection.execute(`DROP USER ${process.env.DB_USER} CASCADE`);
    }

    await connection.execute(
      `CREATE USER ${process.env.DB_USER} IDENTIFIED BY ${process.env.DB_PASSWORD}`
    );
    await connection.execute(`GRANT ALL PRIVILEGES TO ${process.env.DB_USER}`);

    console.info(`Successfully created user and database ${process.env.DB_USER}.`);

    connection.close();
    process.exit(0);
  } catch (err) {
    console.error("Error re-creating database", err);

    process.exit(1);
  }
})();
