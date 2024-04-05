import sql from "../config/sqlServerConfig.js";

export const createRequestModels = (data, token) => {
  const query = `INSERT INTO [dbo].[t_request]
  ([email]
  ,[token]
  ,[request_item])
VALUES
  ('${data.email}'
  ,'${token}'
  ,'${data.request_item}')`;

  return sql.query(query);
};
// export const createRequestModels = (data, token) => {
//   const query = `INSERT INTO t_request SET
//     email = '${data.email}',
//     token = '${token}',
//     request_item = '${data.request_item}'`;

//   return sql.query(query);
// };

export const getRequestByToken = (token) => {
  const query = `SELECT * FROM t_request WHERE token = '${token}'`;
  return sql.query(query);
};

export const deleteRequestModels = (token) => {
  const query = `delete from t_request WHERE token ='${token}'`;
  return sql.query(query);
};
