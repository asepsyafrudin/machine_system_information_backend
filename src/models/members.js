import sql from "../config/sqlServerConfig.js";

export const createMembers = (projectId, memberId) => {
  const query = `INSERT INTO [dbo].[t_member_project]
  ([project_id]
  ,[user_id])
VALUES
  ('${projectId}'
  , ${memberId})`;

  return sql.query(query);
};

// export const createMembers = (projectId, memberId) => {
//   const query = `INSERT INTO t_member_project set
//     project_id = '${projectId}',
//     user_id = ${memberId}`;

//   return sql.query(query);
// };

export const deleteMembers = (projectId) => {
  const query = `DELETE from t_member_project WHERE project_id = '${projectId}'`;
  return sql.query(query);
};

export const getMemberByProjectId = (projectId) => {
  const query = `SELECT * from t_member_project WHERE project_id = '${projectId}'`;
  return sql.query(query);
};
