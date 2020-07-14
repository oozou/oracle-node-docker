const { query } = require("../db");

module.exports.description = "Pets table";

module.exports.up = async function () {
  await query(`CREATE TABLE pets (name VARCHAR(255))`);
};

module.exports.down = async function () {
  await query(`DROP TABLE pets`);
};
