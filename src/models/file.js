
import sql from "../config/sqlServerConfig.js"

export const createFilesModels = (document_id, filename, name) => {
  const query = `INSERT INTO [dbo].[t_file]
  ([document_id]
  ,[file]
  ,[name])
VALUES
  ('${document_id}'
  ,'${filename}'
  ,'${name}')`;
  return sql.query(query);
};

// export const createFilesModels = (document_id, filename, name) => {
//   const query = `INSERT INTO t_file SET
//     document_id = '${document_id}',
//     name = '${name}',
//     file = '${filename}'
//     `;
//   return sql.query(query);
// };

export const getFileByDocumentId = (id) => {
  const query = `SELECT * FROM t_file WHERE document_id = '${id}'`;
  return sql.query(query);
};

export const deleteFileByDocumentIdModels = (document_id) => {
  const query = `DELETE FROM t_file where document_id = '${document_id}'`;
  return sql.query(query);
};

export const deleteFileByIdModels = (id) => {
  const query = `DELETE FROM t_file where id = ${id}`;
  return sql.query(query);
};
