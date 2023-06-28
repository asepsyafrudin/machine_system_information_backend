import db from "../config/db.js";

export const createProjectModels = (data) => {
  const sql = `INSERT INTO t_project SET 
        id = '${data.id}',
        product_id = ${data.product_id},
        project_name = '${data.project_name}',
        manager_id = ${data.manager_id},
        budget = '${data.budget}',
        saving_cost = '${data.saving_cost}',
        start  = '${data.start}',
        finish = '${data.finish}',
        user_id = ${data.user_id},
        status = '${data.status}'
    `;
  return db.execute(sql);
};

export const updateProjectModels = (data) => {
  const sql = `UPDATE t_project SET
    product_id = ${data.product_id},
    project_name = '${data.project_name}',
    manager_id = ${data.manager_id},
    budget = '${data.budget}',
    saving_cost = '${data.saving_cost}',
    start  = '${data.start}',
    finish = '${data.finish}',
    user_id = ${data.user_id} WHERE
    id = '${data.id}'
`;
  return db.execute(sql);
};

export const getAllProjectModels = (limit, offset) => {
  const sql = `SELECT * FROM t_project ORDER BY create_date DESC LIMIT ${offset},${limit}
    `;
  return db.execute(sql);
};

export const getProjectByIdModels = (id) => {
  const sql = `SELECT * FROM t_project WHERE id = '${id}'`;
  return db.execute(sql);
};

export const countGetAllProjectModels = () => {
  const sql = `SELECT * FROM t_project
      `;
  return db.execute(sql);
};

export const updateStatusProjectModels = (id, status) => {
  const sql = `UPDATE t_project SET status = '${status}' WHERE id = '${id}'`;
  return db.execute(sql);
};
