import sql from "../config/sqlServerConfig.js"


export const createLineModels = (data) => {
  const query = `INSERT INTO [dbo].[t_line]
  ([line_name]
  ,[status]
  ,[product_id])
VALUES
  ('${data.line_name}' 
  ,'${data.status}'
  ,${data.product_id})`;
  return sql.query(query);
};
// export const createLineModels = (data) => {
//   const query = `INSERT INTO t_line SET line_name = '${data.line_name}' , status = '${data.status}' , product_id = ${data.product_id}`;
//   return sql.query(query);
// };

export const getAllLineModels = () => {
  const query = `SELECT t_line.id, t_line.line_name, t_line.status, t_line.product_id,  t_product.product_name from t_line INNER JOIN t_product ON t_line.product_id = t_product.id`;
  return sql.query(query);
};

export const updateLineModels = (data) => {
  const query = `UPDATE t_line SET line_name='${data.line_name}', product_id = ${data.product_id} where id=${data.id}`;
  return sql.query(query);
};

export const updateStatusLineModels = (data) => {
  const query = `UPDATE t_line SET status='${data.status}' where id=${data.id}`;
  return sql.query(query);
};

export const searchLineModels = (searchValue) => {
  const query = `SELECT t_line.id, 
  t_line.line_name, 
  t_line.status, 
  t_line.product_id,  
  t_product.product_name 
  from t_line INNER JOIN t_product on 
  t_line.status like '${searchValue}%' 
  or t_product.product_name like '%${searchValue}%'
  or t_line.line_name like '%${searchValue}%' 
  where t_line.product_id = t_product.id `;

  return sql.query(query);
};

export const deleteLineModels = (id) => {
  const query = `DELETE FROM t_line where id = ${id} `;
  return sql.query(query);
};
