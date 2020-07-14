const fs = require("fs");
const oracledb = require("oracledb");
const dotenv = require("dotenv");
const path = require("path");

const envPath = path.join(__dirname, ".env");

if (!fs.existsSync(envPath)) {
  console.error(
    "Please create a .env file before running database operations."
  );

  process.exit(1);
}

dotenv.config({ path: envPath });

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING,
  privilege: oracledb.DEFAULT,
  externalAuth: false,
};

async function query(q) {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    try {
      await connection.execute(q);
    } catch (e) {
      if (e.errorNum !== 942) console.error(e);
    }
    await connection.close();
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  query,
};
