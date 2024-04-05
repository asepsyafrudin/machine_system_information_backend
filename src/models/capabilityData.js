
import sql from "../config/sqlServerConfig.js"

export const createDataCapabilityModels = (data, capabilityId, status) => {
  const query = `INSERT INTO [dbo].[t_capability_data]
  ([capability_id]
  ,[data]
  ,[status])
VALUES
  ('${capabilityId}'
  ,'${data}'
  ,'${status}')
    `;
  return sql.query(query);
};

export const deleteDataCapabilityByCapabilityIdModels = (capabilityId) => {
  const query = `delete from t_capability_data where capability_id = '${capabilityId}'`;
  return sql.query(query);
};

export const getDataCapabilityByCapabilityIdModels = (capabilityId) => {
  const query = `SELECT * from t_capability_data where capability_id = '${capabilityId}'`;
  return sql.query(query);
};
