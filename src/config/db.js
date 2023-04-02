import mysql from "mysql2";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Samsung@a6plus",
  database: "machine_information_systemdb",
});

// db.connect((err) => {
//   if (err) throw err;
//   console.log("database already connected");
// });

export default db.promise();

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Samsung@a6plus",
//   database: "machine_information_systemdb",
// });

// export default db;
