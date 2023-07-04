import db from "../config/db.js";

export const createActivityModels = (data) => {
  const sql = `INSERT INTO t_activity SET
    id = '${data.id}',
    name = '${data.name}',
    progress = '${data.progress}',
    type = '${data.type}',
    project_id = '${data.project}',
    start = '${data.start}',
    finish ='${data.end}'`;

  return db.execute(sql);
};

export const updateActivityModels = (data) => {
  const sql = `update t_activity SET
      name = '${data.name}',
      progress = '${data.progress}',
      type = '${data.type}',
      project_id = '${data.project}',
      start = '${data.start}',
      finish ='${data.end}' WHERE  id = '${data.id}'`;
  return db.execute(sql);
};

export const deleteActivityByProjectId = (id) => {
  const sql = `DELETE FROM t_activity WHERE project_id = '${id}'`;
  return db.execute(sql);
};

export const deleteActivityByActivityId = (id) => {
  const sql = `DELETE from t_activity WHERE id = '${id}'`;
  return db.execute(sql);
};

export const getAllActivity = () => {
  const sql = `SELECT * FROM t_activity`;
  return db.execute(sql);
};

export const getActivityByActivityIdModels = (id) => {
  const sql = `SELECT * FROM t_activity WHERE id='${id}'`;
  return db.execute(sql);
};

export const getActivityByProjectIdModels = (projectId) => {
  const sql = `SELECT * from t_activity WHERE project_id = '${projectId}'`;
  return db.execute(sql);
};

export const avgActivityByProjectIdModels = (projectId) => {
  const sql = `SELECT AVG(progress) as progress FROM t_activity WHERE project_id = '${projectId}'`;
  return db.execute(sql);
};
