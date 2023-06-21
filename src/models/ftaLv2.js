import db from "../config/db.js";

export const createFtaLv2Models = (data) => {
  const sql = `INSERT INTO t_level2 SET 
    id = '${data.id}',
    level1_id = '${data.level1_id}',
    type = '${data.type}',
    description = '${data.description}'
    `;

  return db.execute(sql);
};

export const getFtaLv2ModelsByLv1Id = (id) => {
  const sql = `SELECT * FROM t_level2 WHERE level1_id = '${id}'`;
  return db.execute(sql);
};
