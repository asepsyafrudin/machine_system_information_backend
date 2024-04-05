
import sql from "../config/sqlServerConfig.js";

export const createProblemModels = (data) => {
  const query = `INSERT INTO [dbo].[t_problem]
  ([id]
  ,[machine_id]
  ,[user_id]
  ,[problem_name])
VALUES
  ('${data.id}'
  ,'${data.machine_id}'
  ,'${data.user_id}'
  ,'${data.problem_name}')
    `;
  return sql.query(query);
};
// export const createProblemModels = (data) => {
//   const query = `INSERT INTO t_problem SET 
//     id = '${data.id}',
//     machine_id = '${data.machine_id}',
//     user_id = '${data.user_id}',
//     problem_name = '${data.problem_name}'
//     `;
//   return sql.query(query);
// };

export const getAllProblemModels = (limit, offset) => {
  const query = `SELECT 
  t_problem.id,
  t_problem.machine_id,
  t_machine.machine_name,
  t_problem.user_id,
  t_users.username,
  t_users.email,
  t_problem.create_date,
  t_problem.problem_name 
  FROM t_problem JOIN t_machine ON t_problem.machine_id = t_machine.id 
  JOIN t_users ON t_problem.user_id = t_users.id ORDER by t_problem.create_date desc OFFSET ${offset} ROWS
  FETCH NEXT ${limit} ROWS ONLY`;

  return sql.query(query);
};

export const countDataProblem = () => {
  const query = `SELECT * FROM t_problem`;
  return sql.query(query);
};

export const getProblemByIdModels = (problemId) => {
  const query = `SELECT 
  t_problem.id,
  t_problem.machine_id,
  t_machine.machine_name,
  t_problem.user_id,
  t_users.username,
  t_users.email,
  t_problem.create_date,
  t_problem.problem_name,
  t_machine.line_id,
  t_line.product_id
  FROM t_problem JOIN t_machine ON t_problem.machine_id = t_machine.id 
  JOIN t_users ON t_problem.user_id = t_users.id 
  JOIN t_line ON t_machine.line_id = t_line.id 
  JOIN t_product ON t_line.product_id = t_product.id
  where t_problem.id = '${problemId}'`;
  return sql.query(query);
};

export const getProblemModelsByMachineId = (machineId) => {
  const query = `SELECT 
  t_problem.id,
  t_problem.machine_id,
  t_machine.machine_name,
  t_problem.user_id,
  t_users.username,
  t_users.email,
  t_problem.create_date,
  t_problem.problem_name,
  t_machine.line_id,
  t_line.product_id
  FROM t_problem JOIN t_machine ON t_problem.machine_id = t_machine.id 
  JOIN t_users ON t_problem.user_id = t_users.id 
  JOIN t_line ON t_machine.line_id = t_line.id 
  JOIN t_product ON t_line.product_id = t_product.id
  where t_problem.machine_id = '${machineId}' ORDER by t_problem.create_date DESC`;
  return sql.query(query);
};

export const searchProblemByIdMachineModels = (machineId, limit, offset) => {
  const query = `SELECT
  t_problem.id,
  t_problem.machine_id,
  t_machine.machine_name,
  t_problem.user_id,
  t_users.username,
  t_users.email,
  t_problem.create_date,
  t_problem.problem_name,
  t_machine.line_id,
  t_line.product_id
  FROM t_problem JOIN t_machine ON t_problem.machine_id = t_machine.id 
  JOIN t_users ON t_problem.user_id = t_users.id 
  JOIN t_line ON t_machine.line_id = t_line.id 
  JOIN t_product ON t_line.product_id = t_product.id
  where t_problem.machine_id = '${machineId}' ORDER by t_problem.create_date desc OFFSET ${offset} ROWS
  FETCH NEXT ${limit} ROWS ONLY `;
  return sql.query(query);
};

export const deleteProblemModels = (id) => {
  const query = `DELETE from t_problem where id = "${id}"`;
  return sql.query(query);
};
