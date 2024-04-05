import sql from "../config/sqlServerConfig.js";

export const createPatternModels = (data) => {
  const query = `INSERT INTO [dbo].[t_pattern]
    ([id],
    [pattern_name],
    [create_by])
    VALUES
    (
    '${data.id}',
    '${data.pattern_name}',
    '${data.create_by}')`;
  return sql.query(query);
};

export const getAllPatternModels = (userId) => {
  const query = `SELECT * FROM t_pattern where t_pattern.create_by = '${userId}'`;
  return sql.query(query);
};

export const getPatternByPatternIdModels = (id) => {
  const query = `SELECT * FROM t_pattern WHERE id = '${id}'`;
  return sql.query(query);
};

export const updatePatternModels = (data) => {
  const query = `UPDATE t_pattern SET 
    pattern_name = '${data.pattern_name}'
    WHERE id = ${data.id}`;
  return sql.query(query);
};

export const deletePatternByPatternIdModels = (id) => {
  const query = `DELETE FROM t_pattern WHERE id = ${id}`;
  return sql.query(query);
};
