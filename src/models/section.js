import sql from "../config/sqlServerConfig.js";

export const createSectionModels = (data) => {
  const query = `INSERT INTO [dbo].[t_section]
  ([section_name])
VALUES
  ('${data.section_name}')
    `;
  return sql.query(query);
};
// export const createSectionModels = (data) => {
//   const query = `INSERT INTO t_section SET 
//     section_name = '${data.section_name}'
//     `;
//   return sql.query(query);
// };

export const updateSectionModels = (data) => {
  const query = `UPDATE t_section SET 
    section_name = '${data.section_name}'
    WHERE id = ${data.id}`;
  return sql.query(query);
};

export const getSectionModels = () => {
  const query = `SELECT * FROM t_section`;
  return sql.query(query);
};

export const getSectionByIdModels = (id) => {
  const query = `SELECT * FROM t_section WHERE id = ${id}`;
  return sql.query(query);
};

export const deleteSectionModels = (id) => {
  const query = `DELETE from t_section WHERE id = ${id}`;
  return sql.query(query);
};
