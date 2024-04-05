import sql from "../config/sqlServerConfig.js";

export const getDataManagerListModels = () => {
  const query = `select * from t_approval`;
  return sql.query(query);
};
