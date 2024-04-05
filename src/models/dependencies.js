import sql from "../config/sqlServerConfig.js"

export const createDependenciesModels = (activityId, name) => {
  const query = `INSERT INTO [dbo].[t_activity_dependencies]
  ([activity_id]
  ,[name])
VALUES
  ('${activityId}'
  , '${name}')`;
  return sql.query(query);
};

// export const createDependenciesModels = (activityId, name) => {
//   const query = `INSERT INTO t_activity_dependencies SET 
//     activity_id = '${activityId}',
//     name = '${name}'
//     `;

//   return sql.query(query);
// };

export const deleteDependenciesModels = (activityId) => {
  const query = `DELETE from t_activity_dependencies WHERE activity_id = '${activityId}'`;
  return sql.query(query);
};

export const getDependenciesByActivityIdModels = (activityId) => {
  const query = `SELECT * FROM t_activity_dependencies WHERE activity_id = '${activityId}'`;
  return sql.query(query);
};
