import mysql from "mysql2";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Samsung@a6plus",
  database: "machine_information_system_trial",
});

export default db.promise();
