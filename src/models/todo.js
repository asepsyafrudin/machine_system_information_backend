import sql from "../config/sqlServerConfig.js";

export const createTodoModels = (data) => {
  const query = `INSERT INTO [dbo].[t_todo]
  ([id]
  ,[project_id]
  ,[item]
  ,[due_date]
  ,[user_id]
  ,[actual_finish]
  ,[status]
  ,[pic_id]
  ,[activity_name])
VALUES
  ('${data.id}'
  ,'${data.project_id}'
  ,'${data.item}'
  ,'${data.due_date}'
  ,${data.user_id}
  ,'${data.actual_finish}'
  ,'${data.status}'
  ,${data.pic_id}
  ,'${data.activity_name}')`;
  return sql.query(query);
};

export const updateTodoModels = (data) => {
  const query = `UPDATE t_todo SET 
    project_id = '${data.project_id}',
    item = '${data.item}',
    due_date = '${data.due_date}',
    user_id = ${data.user_id},
    actual_finish = '${data.actual_finish}',
    status = '${data.status}',
    pic_id = ${data.pic_id},
    activity_name = '${data.activity_name}'
    WHERE 
    id = '${data.id}'`;
  return sql.query(query);
};

export const getTodoByIdModels = (id) => {
  const query = `SELECT * FROM t_todo where id = '${id}'`;
  return sql.query(query);
};

export const getTodoByProjectIdModels = (projectId, limit, offset) => {
  const query = `SELECT * FROM t_todo where project_id = '${projectId}' 
  ORDER by due_date desc OFFSET ${offset} ROWS
  FETCH NEXT ${limit} ROWS ONLY`;
  return sql.query(query);
};

export const countTotalDataTodoList = (projectId) => {
  const query = `SELECT * FROM t_todo where project_id = '${projectId}'`;
  return sql.query(query);
};

export const deleteTodoByIdModels = (id) => {
  const query = `DELETE FROM t_todo where id = '${id}'`;
  return sql.query(query);
};


export const getTodoListByUserIdModels = (userId, limit, offset) => {
  const query = `select 
  t_todo.id,
  t_todo.project_id,
  t_todo.item,
  t_todo.due_date, 
  t_todo.create_date,
  t_todo.user_id,
  t_todo.actual_finish,
  t_todo.pic,
  t_todo.pic_id,
  t_todo.activity_name,
  t_todo.status,
  t_project.project_name
  from t_todo join t_project on t_todo.project_id = t_project.id
  where t_todo.pic_id = ${userId} order by t_todo.due_date desc OFFSET ${offset} ROWS
  FETCH NEXT ${limit} ROWS ONLY`;

  return sql.query(query);
};

export const getAssignmentSummaryModels = (userId, limit, offset) => {
  const query = `select
    t_todo.id,
    t_todo.project_id,
    t_todo.item,
    t_todo.due_date,
    t_todo.create_date,
    t_todo.user_id,
    t_todo.actual_finish,
    t_todo.pic,
    t_todo.pic_id,
    t_todo.activity_name,
    t_todo.status,
    t_project.project_name
    from t_todo join t_project on t_todo.project_id = t_project.id
    where t_todo.user_id = ${userId} AND t_todo.pic_id IS NOT NULL AND t_todo.pic_id != t_todo.user_id ORDER BY t_todo.due_date 
    desc OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY`;
  return sql.query(query);
};

export const countGetAssignmentSummaryModels = (userId) => {
  const query = `select
    t_todo.id,
    t_todo.project_id,
    t_todo.item,
    t_todo.due_date, 
    t_todo.create_date,
    t_todo.user_id,
    t_todo.actual_finish,
    t_todo.pic,
    t_todo.pic_id,
    t_todo.activity_name,
    t_todo.status,
    t_project.project_name
    from t_todo join t_project on t_todo.project_id = t_project.id
    where t_todo.user_id = ${userId} AND t_todo.pic_id IS NOT NULL AND t_todo.pic_id != t_todo.user_id ORDER BY  t_todo.due_date desc `;
  return sql.query(query);
};

export const countGetTodoListByUserIdModels = (userId) => {
  const query = `select 
  t_todo.id,
  t_todo.project_id,
  t_todo.item,
  t_todo.due_date, 
  t_todo.create_date,
  t_todo.user_id,
  t_todo.actual_finish,
  t_todo.pic,
  t_todo.pic_id,
  t_todo.activity_name,
  t_todo.status,
  t_project.project_name
  from t_todo join t_project on t_todo.project_id = t_project.id
  where t_todo.pic_id = ${userId} order by t_todo.due_date desc`;
  return sql.query(query);
};
