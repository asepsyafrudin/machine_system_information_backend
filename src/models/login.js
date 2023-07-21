import res from "express/lib/response.js";
import db from "../config/db.js";
import { comparePassword } from "../config/hashPassword.js";

export const loginModels = async (userName, password) => {
  const sql = `SELECT
  t_users.id,
  t_users.email, 
  t_users.password,
  t_users.product_id,
  t_product.product_name,
  t_users.position,
  t_users.photo,
  t_users.npk,
  t_product.section_id,
  t_section.section_name
  FROM t_users JOIN t_product ON t_users.product_id = t_product.id 
  JOIN t_section ON t_product.section_id = t_section.id where t_users.npk = '${userName}'`;
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
