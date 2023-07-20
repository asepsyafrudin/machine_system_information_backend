import db from "../config/db.js";

export const createSectionModels = (data) => {
  const sql = `INSERT INTO t_section SET 
    section_name = '${data.section_name}'
    `;
  return db.execute(sql);
};

export const updateSectionModels = (data) => {
  const sql = `UPDATE t_section SET 
    section_name = '${data.section_name}'
    WHERE id = ${data.id}`;
  return db.execute(sql);
};

export const getSectionModels = () => {
  const sql = `SELECT * FROM t_section`;
  return db.execute(sql);
};

export const getSectionByIdModels = (id) => {
  const sql = `SELECT * FROM t_section WHERE id = ${id}`;
  return db.execute(sql);
};

export const deleteSectionModels = (id) => {
  const sql = `DELETE from t_section WHERE id = ${id}`;
  return db.execute(sql);
};
