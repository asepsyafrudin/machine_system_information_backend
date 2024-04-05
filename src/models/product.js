
import sql from "../config/sqlServerConfig.js";

export const createProductModels = (data) => {
  const query = `INSERT INTO [dbo].[t_product]
  ([product_name]
  ,[status]
  ,[section_id])
VALUES
  ('${data.product_name}'
  ,'${data.status}'
  ,${data.section_id})`;
  return sql.query(query);
};
// export const createProductModels = (data) => {
//   const query = `INSERT INTO t_product SET product_name = '${data.product_name}', 
//   status = '${data.status}',
//   section_id = ${data.section_id}`;
//   return sql.query(query);
// };

export const updateProductNameModels = (data) => {
  const query = `UPDATE t_product SET product_name = '${data.product_name}',
  section_id = ${data.section_id}
  where id = ${data.id}`;
  return sql.query(query);
};

export const updateProductStatusModels = (data) => {
  const query = `UPDATE t_product SET status='${data.status}' where id = ${data.id}`;
  return sql.query(query);
};

export const deleteProductModels = (id) => {
  const query = `DELETE from t_product where id  = ${id}`;
  return sql.query(query);
};

export const getAllProductModels = () => {
  const query = `SELECT * FROM t_product`;
  return sql.query(query);
};

export const searchProductModels = (searchValue) => {
  const query = `SELECT * from t_product where product_name like '%${searchValue}%' or status like '%${searchValue}%'`;
  return sql.query(query);
};

export const getProductByIdModels = (id) => {
  const query = `SELECT * from t_product WHERE id= ${id}`;
  return sql.query(query);
};
