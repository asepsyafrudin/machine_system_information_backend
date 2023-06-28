import mysql from "mysql2";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "paras23082011",
  database: "machine_information_systemdb",
});

export default db.promise();
