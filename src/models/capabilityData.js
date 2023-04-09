import db from "../config/db.js";

export const createDataCapabilityModels = (data, capabilityId) => {
  const sql = `INSERT INTO t_capability_data SET 
    capability_id = '${capabilityId}',
    data = '${data}'
    `;
  return db.execute(sql);
};

export const deleteDataCapabilityByCapabilityIdModels = (capabilityId) => {
  const sql = `delete from t_capability_data where capability_id = '${capabilityId}'`;
  return db.execute(sql);
};

export const getDataCapabilityByCapabilityIdModels = (capabilityId) => {
  const sql = `SELECT * from t_capability_data where capability_id = '${capabilityId}'`;
  return db.execute(sql);
};
