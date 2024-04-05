import sql from "../config/sqlServerConfig.js"

export const createfileUploadGeneralModels = (data, filename) => {
  const query = `INSERT INTO t_file_general SET 
    file_name = '${data.file_name}',
    file_url = '${filename}'
    `;
  return sql.query(query);
};

export const deleteFileUploadGeneralModels = (id) => {
  const query = `DELETE from t_file_general where id = ${id}`;
  return sql.query(query);
};
