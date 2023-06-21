import db from "../config/db.js";

export const createProblemModels = (data) => {
  const sql = `INSERT INTO t_problem SET 
    id = '${data.id}',
    machine_id = '${data.machine_id}',
    user_id = '${data.user_id}',
    problem_name = '${data.problem_name}'
    `;
  return db.execute(sql);
};

export const getAllProblemModels = (limit, offset) => {
  const sql = `SELECT 
  t_problem.id,
  t_problem.machine_id,
  t_machine.machine_name,
  t_problem.user_id,
  t_users.username,
  t_users.email,
  t_problem.create_date,
  t_problem.problem_name 
  FROM t_problem JOIN t_machine ON t_problem.machine_id = t_machine.id 
  JOIN t_users ON t_problem.user_id = t_users.id ORDER by t_problem.create_date DESC
  LIMIT ${offset},${limit} `;

  return db.execute(sql);
};

export const countDataProblem = () => {
  const sql = `SELECT COUNT(id) as count FROM t_problem`;
  return db.execute(sql);
};

export const getProblemByIdModels = (problemId) => {
  const sql = `SELECT 
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
  return db.execute(sql);
};

export const getProblemModelsByMachineId = (machineId) => {
  const sql = `SELECT 
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
  return db.execute(sql);
};

export const deleteProblemModels = (id) => {
  const sql = `DELETE from t_problem where id = "${id}"`;
  return db.execute(sql);
};
