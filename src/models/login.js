import res from "express/lib/response.js";
import db from "../config/db.js";
import { comparePassword } from "../config/hashPassword.js";

export const loginModels = async (userName, password) => {
  const sql = `SELECT * FROM t_users where npk = '${userName}'`;
  const [result] = await db.execute(sql);
  if (result) {
    const checkPassword = comparePassword(password, result[0].password);
    if (checkPassword) {
      return result;
    } else {
      return "";
    }
  }
};
