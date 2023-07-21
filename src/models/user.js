import db from "../config/db.js";
import { encryptPassword } from "../config/hashPassword.js";

export const createUserModels = (data, filename) => {
  const password = encryptPassword(data.password);
  const sql = `INSERT INTO t_users SET 
    username = '${data.username.toLowerCase()}', 
    npk = '${data.npk}',
    email = '${data.email.toLowerCase()}',
    password ='${password}',
    product_id = ${data.product},
    position = '${data.position}', 
    photo = '${filename}'`;
  return db.execute(sql);
};

export const getAllUsersModels = () => {
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
  JOIN t_section ON t_product.section_id = t_section.id`;
  return db.execute(sql);
};

export const deleteUserModels = (id) => {
  const sql = `delete from t_users where id = ${id}`;
  return db.execute(sql);
};

export const updateUsersModels = (data, filename) => {
  const password = encryptPassword(data.password);
  const sql = `UPDATE t_users SET username = '${data.username.toLowerCase()}',
    email = '${data.email.toLowerCase()}',
    password ='${password}', 
    product_id = ${data.product},
    position = '${data.position}', 
    photo = '${filename}' where npk = '${data.npk}'`;

  const sql2 = `UPDATE t_users SET username = '${data.username.toLowerCase()}',
    email = '${data.email.toLowerCase()}',
    password ='${password}',
    product_id = ${data.product},
    position = '${data.position}' where npk = '${data.npk}'`;

  if (filename === "") {
    return db.execute(sql2);
  }
  return db.execute(sql);
};

export const findUserModels = (searchValue) => {
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
  JOIN t_section ON t_product.section_id = t_section.id
  where username like '%${searchValue}%' or npk like '%${searchValue}%' or email like '%${searchValue}%'`;
  return db.execute(sql);
};

export const getUserByUserIdModels = (userId) => {
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
  JOIN t_section ON t_product.section_id = t_section.id
  where t_users.id = ${userId}`;
  return db.execute(sql);
};

export const getUserByNPKModels = (npk) => {
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
  JOIN t_section ON t_product.section_id = t_section.id where t_users.npk = '${npk}'`;
  return db.execute(sql);
};

export const getUserByEmailModels = (email) => {
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
  JOIN t_section ON t_product.section_id = t_section.id where t_users.email = '${email}'`;
  return db.execute(sql);
};

export const changePasswordModels = (data) => {
  const password = encryptPassword(data.password);
  const sql = `UPDATE t_users SET 
  password = '${password}' where email = '${data.email}'
  `;

  return db.execute(sql);
};

export const resetPhotoProfileModels = (id) => {
  const sql = `update t_users set 
  photo = '' where id = ${id}`;
  return db.execute(sql);
};
