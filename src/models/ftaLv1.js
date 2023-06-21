import db from "../config/db.js";

export const createFtaLv1Models = (data) => {
  const sql = `INSERT INTO t_level1 SET 
    id = '${data.id}',
    problem_id = '${data.problem_id}',
    type = '${data.type}',
    description = '${data.description}'
    `;

  return db.execute(sql);
};

export const getFTaLv1ByProblemIdModels = (problemId) => {
  const sql = `SELECT * FROM t_level1 WHERE problem_id = '${problemId}'`;
  return db.execute(sql);
};
