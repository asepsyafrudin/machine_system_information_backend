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
    pic_id = ${data.pic_id},
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
    status = '${data.status}',
    pic_id = ${data.pic_id} WHERE 
    id = '${data.id}'`;

  return db.execute(sql);
};

export const getTodoByIdModels = (id) => {
  const sql = `SELECT * FROM t_todo where id = '${id}'`;
  return db.execute(sql);
};

export const getTodoByProjectIdModels = (projectId, limit, offset) => {
  const sql = `SELECT * FROM t_todo where project_id = '${projectId}' 
  ORDER by due_date DESC LIMIT ${offset},${limit}`;
  return db.execute(sql);
};

export const countTotalDataTodoList = (projectId) => {
  const sql = `SELECT * FROM t_todo where project_id = '${projectId}'`;
  return db.execute(sql);
};

export const deleteTodoByIdModels = (id) => {
  const sql = `DELETE FROM t_todo where id = '${id}'`;
  return db.execute(sql);
};

export const getTodoListByUserIdModels = (userId) => {
  const sql = `select 
  t_todo.id,
  t_todo.project_id,
  t_todo.item,
  t_todo.due_date, 
  t_todo.create_date,
  t_todo.user_id,
  t_todo.actual_finish,
  t_todo.pic,
  t_todo.pic_id,
  t_todo.status,
  t_project.project_name
  from t_todo join t_project on t_todo.project_id = t_project.id
  where pic_id = ${userId} order by t_todo.due_date desc`;
  return db.execute(sql);
};
