import db from "../config/db.js";

export const createDependenciesModels = (activityId, name) => {
  const sql = `INSERT INTO t_activity_dependencies SET 
    activity_id = '${activityId}',
    name = '${name}'
    `;

  return db.execute(sql);
};

export const deleteDependenciesModels = (activityId) => {
  const sql = `DELETE from t_activity_dependencies WHERE activity_id = '${activityId}'`;
  return db.execute(sql);
};
