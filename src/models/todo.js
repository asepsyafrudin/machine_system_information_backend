import db from "../config/db.js";

export const createTodoModels = (data) => {
  const sql = `INSERT INTO t_todo SET 
    id = '${data.id}',
    project_id = '${data.project_id}',
    item = '${data.item}',
    due_date = '${data.due_date}',
    pic = '${data.pic}',
    user_id = ${data.user_id},
    actual_finish = '${data.actual_finish}',
    status = '${data.status}'`;

  return db.execute(sql);
};

export const updateTodoModels = (data) => {
  const sql = `UPDATE t_todo SET 
    project_id = '${data.project_id}',
    item = '${data.item}',
    due_date = '${data.due_date}',
    pic = '${data.pic}',
    user_id = ${data.user_id},
    actual_finish = '${data.actual_finish}',
    status = '${data.status}' WHERE 
    id = '${data.id}'`;

  return db.execute(sql);
};

export const getTodoByIdModels = (id) => {
  const sql = `SELECT * FROM t_todo where id = '${id}'`;
  return db.execute(sql);
};

export const getTodoByProjectIdModels = (projectId) => {
  const sql = `SELECT * FROM t_todo where project_id = '${projectId}' ORDER by due_date ASC`;
  return db.execute(sql);
};

export const deleteTodoByIdModels = (id) => {
  const sql = `DELETE FROM t_todo where id = '${id}'`;
  return db.execute(sql);
};
