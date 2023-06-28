import db from "../config/db.js";

export const createMembers = (projectId, memberId) => {
  const sql = `INSERT INTO t_member_project set
    project_id = '${projectId}',
    user_id = ${memberId}`;

  return db.execute(sql);
};

export const deleteMembers = (projectId) => {
  const sql = `DELETE from t_member_project WHERE project_id = '${projectId}'`;
  return db.execute(sql);
};

export const getMemberByProjectId = (projectId) => {
  const sql = `SELECT * from t_member_project WHERE project_id = '${projectId}'`;
  return db.execute(sql);
};
