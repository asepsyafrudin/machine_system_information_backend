import db from "../config/db.js";

export const createLineModels = (data) => {
  const sql = `INSERT INTO t_line SET line_name = '${data.line_name}' , status = '${data.status}' , product_id = ${data.product_id}`;
  return db.execute(sql);
};

export const getAllLineModels = () => {
  const sql = `SELECT t_line.id, t_line.line_name, t_line.status, t_line.product_id,  t_product.product_name from t_line INNER JOIN t_product ON t_line.product_id = t_product.id`;
  return db.execute(sql);
};

export const updateLineModels = (data) => {
  const sql = `UPDATE t_line SET line_name='${data.line_name}', product_id = ${data.product_id} where id=${data.id}`;
  return db.execute(sql);
};

export const updateStatusLineModels = (data) => {
  const sql = `UPDATE t_line SET status='${data.status}' where id=${data.id}`;
  return db.execute(sql);
};

export const searchLineModels = (searchValue) => {
  const sql = `SELECT t_line.id, 
  t_line.line_name, 
  t_line.status, 
  t_line.product_id,  
  t_product.product_name 
  from t_line INNER JOIN t_product on 
  t_line.status like '${searchValue}%' 
  or t_product.product_name like '%${searchValue}%'
  or t_line.line_name like '%${searchValue}%' 
  where t_line.product_id = t_product.id `;

  return db.execute(sql);
};

export const deleteLineModels = (id) => {
  const sql = `DELETE FROM t_line where id = ${id} `;
  return db.execute(sql);
};
