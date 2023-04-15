import db from "../config/db.js";

export const createfileUploadGeneralModels = (data, filename) => {
  const sql = `INSERT INTO t_file_general SET 
    file_name = '${data.file_name}',
    file_url = '${filename}'
    `;
  return db.execute(sql);
};

export const deleteFileUploadGeneralModels = (id) => {
  const sql = `DELETE from t_file_general where id = ${id}`;
  return db.execute(sql);
};
