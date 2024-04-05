import dotenv from "dotenv";
import sql from "mssql";

dotenv.config();

const sqlConfig = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  server: process.env.SERVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

const connectDB = async () => {
  try {
    // make sure that any items are correctly URL encoded in the connection string
    await sql.connect(sqlConfig);
    console.log("sql connected");
  } catch (err) {
    // ... error checks
    console.log(err);
  }
};

await connectDB();
export default sql;