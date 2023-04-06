import db from "../config/db.js";
import { encryptPassword } from "../config/hashPassword.js";

export const createUserModels = (data, filename) => {
  const password = encryptPassword(data.password);
  const sql = `INSERT INTO t_users SET 
    username = '${data.username.toLowerCase()}', 
    npk = '${data.npk}',
    email = '${data.email.toLowerCase()}',
    password ='${password}',
    section = '${data.section}', 
    product = '${data.product}',
    position = '${data.position}', 
    photo = '${filename}'`;
  return db.execute(sql);
};

export const getAllUsersModels = () => {
  const sql = "select * from t_users";
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
    section = '${data.section}', 
    product = '${data.product}',
    position = '${data.position}', 
    photo = '${filename}' where npk = '${data.npk}'`;

  const sql2 = `UPDATE t_users SET username = '${data.username.toLowerCase()}',
    email = '${data.email.toLowerCase()}',
    password ='${password}',
    section = '${data.section}', 
    product = '${data.product}',
    position = '${data.position}' where npk = '${data.npk}'`;

  if (filename === "") {
    return db.execute(sql2);
  }
  return db.execute(sql);
};

export const findUserModels = (searchValue) => {
  const sql = `SELECT * FROM t_users where username like '%${searchValue}%' or npk like '%${searchValue}%' or email like '%${searchValue}%'`;
  return db.execute(sql);
};

export const getUserByUserIdModels = (userId) => {
  const sql = `SELECT * FROM t_users where id = ${userId}`;
  return db.execute(sql);
};

export const getUserByNPKModels = (npk) => {
  const sql = `SELECT * FROM t_users where npk = '${npk}'`;
  return db.execute(sql);
};

export const getUserByEmailModels = (email) => {
  const sql = `SELECT * FROM t_users where email = '${email}'`;
  return db.execute(sql);
};

export const changePasswordModels = (data) => {
  const password = encryptPassword(data.password);
  const sql = `UPDATE t_users SET 
  password = '${password}' where email = '${data.email}'
  `;

  return db.execute(sql);
};
