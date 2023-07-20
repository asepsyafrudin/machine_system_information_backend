import db from "../config/db.js";

export const createProductModels = (data) => {
  const sql = `INSERT INTO t_product SET product_name = '${data.product_name}', 
  status = '${data.status}',
  section_id = ${data.section_id}`;
  return db.execute(sql);
};

export const updateProductNameModels = (data) => {
  const sql = `UPDATE t_product SET product_name = '${data.product_name}',
  section_id = ${data.section_id}
  where id = ${data.id}`;
  return db.execute(sql);
};

export const updateProductStatusModels = (data) => {
  const sql = `UPDATE t_product SET status='${data.status}' where id = ${data.id}`;
  return db.execute(sql);
};

export const deleteProductModels = (id) => {
  const sql = `DELETE from t_product where id  = ${id}`;
  return db.execute(sql);
};

export const getAllProductModels = () => {
  const sql = `SELECT * FROM t_product`;
  return db.execute(sql);
};

export const searchProductModels = (searchValue) => {
  const sql = `SELECT * from t_product where product_name like '%${searchValue}%' or status like '%${searchValue}%'`;
  return db.execute(sql);
};

export const getProductByIdModels = (id) => {
  const sql = `SELECT * from t_product WHERE id= ${id}`;
  return db.execute(sql);
};
