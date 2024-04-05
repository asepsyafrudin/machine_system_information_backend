import sql from "../config/sqlServerConfig.js";
import { comparePassword } from "../config/hashPassword.js";

export const loginModels = async (userName) => {
  const query = `SELECT
  t_users.id,
  t_users.username,
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
  return sql.query(query);
};
