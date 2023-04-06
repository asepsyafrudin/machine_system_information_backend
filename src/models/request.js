import db from "../config/db.js";

export const createRequestModels = (data, token) => {
  const sql = `INSERT INTO t_request SET 
    email = '${data.email}',
    token = '${token}',
    request_item = '${data.request_item}'`;

  return db.execute(sql);
};

export const getRequestByToken = (token) => {
  const sql = `SELECT * FROM t_request WHERE token = '${token}'`;
  return db.execute(sql);
};

export const deleteRequestModels = (token) => {
  const sql = `delete from t_request WHERE token ='${token}'`;
  return db.execute(sql);
};
