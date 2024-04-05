import sql from "../config/sqlServerConfig.js"

export const createFtaLv1Models = (data) => {
  const query = `INSERT INTO [dbo].[t_level1]
  ([id]
  ,[problem_id]
  ,[type]
  ,[description])
VALUES
  ('${data.id}'
  ,'${data.problem_id}'
  ,'${data.type}'
  ,'${data.description}')`;

  return sql.query(query);
};
// export const createFtaLv1Models = (data) => {
//   const query = `INSERT INTO t_level1 SET 
//     id = '${data.id}',
//     problem_id = '${data.problem_id}',
//     type = '${data.type}',
//     description = '${data.description}'
//     `;

//   return sql.query(query);
// };

export const getFTaLv1ByProblemIdModels = (problemId) => {
  const query = `SELECT * FROM t_level1 WHERE problem_id = '${problemId}'`;
  return sql.query(query);
};
