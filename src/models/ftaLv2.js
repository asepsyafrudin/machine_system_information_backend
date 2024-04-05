import sql from "../config/sqlServerConfig.js";

export const createFtaLv2Models = (data) => {
  const query = `INSERT INTO [dbo].[t_level2]
    ([id]
    ,[level1_id]
    ,[type]
    ,[description])
VALUES
    ('${data.id}'
    ,'${data.level1_id}'
    ,'${data.type}'
    ,'${data.description}')`;

  return sql.query(query);
};
// export const createFtaLv2Models = (data) => {
//   const query = `INSERT INTO t_level2 SET
//     id = '${data.id}',
//     level1_id = '${data.level1_id}',
//     type = '${data.type}',
//     description = '${data.description}'
//     `;

//   return sql.query(query);
// };

export const getFtaLv2ModelsByLv1Id = (id) => {
  const query = `SELECT * FROM t_level2 WHERE level1_id = '${id}'`;
  return sql.query(query);
};
