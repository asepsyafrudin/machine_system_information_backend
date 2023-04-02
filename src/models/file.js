import db from "../config/db.js";

export const createFilesModels = (document_id, filename, name) => {
  const sql = `INSERT INTO t_file SET
    document_id = '${document_id}',
    name = '${name}',
    file = '${filename}'
    `;
  return db.execute(sql);
};

export const getFileByDocumentId = (id) => {
  const sql = `SELECT * FROM t_file WHERE document_id = '${id}'`;
  return db.execute(sql);
};

export const deleteFileByDocumentIdModels = (document_id) => {
  const sql = `DELETE FROM t_file where document_id = '${document_id}'`;
  return db.execute(sql);
};

export const deleteFileByIdModels = (id) => {
  const sql = `DELETE FROM t_file where id = ${id}`;
  return db.execute(sql);
};
