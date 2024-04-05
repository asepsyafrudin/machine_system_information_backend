import sql from "../config/sqlServerConfig.js";

export const createActivityModels = (data) => {
  const query = `INSERT INTO [dbo].[t_activity]
  ([id]
  ,[name]
  ,[progress]
  ,[type]
  ,[project_id]
  ,[start]
  ,[finish]
  ,[remark]
  ,[link_to_project]
  ,[pic])
VALUES
  ('${data.id}'
  ,'${data.name}'
  ,'${data.progress}'
  ,'${data.type}'
  ,'${data.project}'
  ,'${data.start}'
  ,'${data.end}'
  ,'${data.remark}'
  ,'${data.linkToProject}'
  ,'${data.pic}')`;
  return sql.query(query);
};
// export const createActivityModels = (data) => {
//   const query = `INSERT INTO [dbo].[t_activity]
//   ([id]
//   ,[name]
//   ,[progress]
//   ,[type]
//   ,[project_id]
//   ,[start]
//   ,[finish]
//   ,[remark]
//   ,[link_to_project]
//   ,[pic]
//   )
// VALUES
//   ('${data.id}'
//   ,'${data.name}'
//   ,'${data.progress}'
//   ,'${data.type}'
//   ,'${data.project}'
//   ,'${data.start}'
//   ,'${data.end}'
//   ,'${data.remark}'
//   ,'${data.linkToProject}'
//   ,'${data.pic}')
//     `;
//   return sql.query(query);
// };

export const updateActivityModels = (data) => {
  const query = `UPDATE [dbo].[t_activity]
  SET [id] = '${data.id}'
     ,[name] = '${data.name}'
     ,[progress] = '${data.progress}'
     ,[type] = '${data.type}'
     ,[project_id] = '${data.project}'
     ,[start] = '${data.start}'
     ,[finish] = '${data.end}'
     ,[link_to_project] = '${data.linkToProject}'
     ,[remark] = '${data.remark}'
     ,[pic] = '${data.pic}'
WHERE [id] = '${data.id}'`;
  return sql.query(query);
};

export const deleteActivityByProjectId = (id) => {
  const query = `DELETE FROM t_activity WHERE project_id = '${id}'`;
  return sql.query(query);
};

export const deleteActivityByActivityId = (id) => {
  const query = `DELETE from t_activity WHERE id = '${id}'`;
  return sql.query(query);
};

export const getAllActivity = () => {
  const query = `SELECT * FROM t_activity`;
  return sql.query(query);
};

export const getActivityByActivityIdModels = (id) => {
  const query = `SELECT * FROM t_activity WHERE id='${id}'`;
  return sql.query(query);
};

export const getActivityByProjectIdModels = (projectId) => {
  const query = `SELECT * from t_activity WHERE project_id = '${projectId}'`;
  return sql.query(query);
};

export const avgActivityByProjectIdModels = (projectId) => {
  const query = `SELECT AVG(progress) as progress FROM t_activity WHERE project_id = '${projectId}' And REMARK != 'revise'`;
  return sql.query(query);
};
