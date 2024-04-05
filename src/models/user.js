import { encryptPassword } from "../config/hashPassword.js";
import sql from "../config/sqlServerConfig.js";

export const createUserModels = (data, filename) => {
  const password = encryptPassword(data.password);
  const query = `INSERT INTO [dbo].[t_users]
  ([username]
  ,[npk]
  ,[email]
  ,[password]
  ,[photo]
  ,[position]
  ,[product_id])
VALUES
  ('${data.username.toLowerCase()}'
  ,'${data.npk}'
  ,'${data.email.toLowerCase()}'
  ,'${password}'
  ,'${filename}'
  ,'${data.position}'
  , ${data.product_id})`;
  return sql.query(query);
};
// export const createUserModels = (data, filename) => {
//   const password = encryptPassword(data.password);
//   const query = `INSERT INTO t_users SET
//     username = '${data.username.toLowerCase()}',
//     npk = '${data.npk}',
//     email = '${data.email.toLowerCase()}',
//     password ='${password}',
//     product_id = ${data.product_id},
//     position = '${data.position}',
//     photo = '${filename}'`;
//   return sql.query(query);
// };

export const getAllUsersModels = () => {
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
  JOIN t_section ON t_product.section_id = t_section.id`;
  return sql.query(query);
};

export const deleteUserModels = (id) => {
  const query = `delete from t_users where id = ${id}`;
  return sql.query(query);
};

export const updateUsersModels = (data, filename) => {
  const password = encryptPassword(data.password);
  const query = `UPDATE t_users SET username = '${data.username.toLowerCase()}',
    email = '${data.email.toLowerCase()}',
    password ='${password}', 
    product_id = ${data.product_id},
    position = '${data.position}', 
    photo = '${filename}' where npk = '${data.npk}'`;

  const query2 = `UPDATE t_users SET username = '${data.username.toLowerCase()}',
    email = '${data.email.toLowerCase()}',
    password ='${password}',
    product_id = ${data.product_id},
    position = '${data.position}' where npk = '${data.npk}'`;

  if (filename === "") {
    return sql.query(query2);
  }
  return sql.query(query);
};

export const findUserModels = (searchValue) => {
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
  JOIN t_section ON t_product.section_id = t_section.id
  where username like '%${searchValue}%' or npk like '%${searchValue}%' or email like '%${searchValue}%'`;
  return sql.query(query);
};

export const getUserByUserIdModels = (userId) => {
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
  JOIN t_section ON t_product.section_id = t_section.id
  where t_users.id = ${userId}`;
  return sql.query(query);
};

export const getUserByNPKModels = (npk) => {
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
  JOIN t_section ON t_product.section_id = t_section.id where t_users.npk = '${npk}'`;
  return sql.query(query);
};

export const getUserByEmailModels = (email) => {
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
  JOIN t_section ON t_product.section_id = t_section.id where t_users.email = '${email}'`;
  return sql.query(query);
};

export const changePasswordModels = (data) => {
  const password = encryptPassword(data.password);
  const query = `UPDATE t_users SET 
  password = '${password}' where email = '${data.email}'
  `;

  return sql.query(query);
};

export const resetPhotoProfileModels = (id) => {
  const query = `update t_users set 
  photo = '' where id = ${id}`;
  return sql.query(query);
};
