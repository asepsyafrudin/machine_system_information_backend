
import sql from "../config/sqlServerConfig.js"

export const createDocumentModels = (data, id) => {
  const query = `
  INSERT INTO [dbo].[t_document]
             ([id]
             ,[machine_id]
             ,[user_id]
             ,[file_type]
             ,[description]
             ,[title]
             ,[status]
             ,[project_id])
       VALUES
             ('${id}'
             ,'${data.machine_id}'
             ,${parseInt(data.user_id)}
             ,'${data.file_type}'
             ,'${data.description}'
             ,'${data.title}'
             ,'${data.status}'
             ,'${data.project_id}')`;
  return sql.query(query);
};
// export const createDocumentModels = (data, id) => {
//   const query = `INSERT INTO t_document SET 
//     id = '${id}',
//     title = '${data.title}',
//     machine_id = '${data.machine_id}',
//     user_id=${parseInt(data.user_id)},
//     file_type ='${data.file_type}',
//     description='${data.description}',
//     status ='${data.status}',
//     project_id ='${data.project_id}'`;
//   return sql.query(query);
// };

export const updateDocumentByIdModels = (data) => {
  const query = `UPDATE t_document SET
    title = '${data.title}',
    machine_id = '${data.machine_id}',
    user_id=${parseInt(data.user_id)},
    file_type ='${data.file_type}',
    description='${data.description}',
    project_id ='${data.project_id}'
    WHERE id = '${data.id}'`;
  return sql.query(query);
};

// document for general
export const getAllDocumentForGeneralModels = () => {
  const query = `SELECT 
    t_document.id,
    t_document.title,
    t_document.create_date,
    t_document.description,
    t_document.user_id,
    t_document.status,
    t_document.file_type,
    t_document.project_id,
    t_users.username,
    t_users.photo,
    t_users.email,
    t_document.machine_id,
    t_machine.machine_name,
    t_machine.line_id,
    t_line.line_name,
    t_line.product_id,
    t_product.product_name
    FROM t_document JOIN t_users ON t_document.user_id = t_users.id
    JOIN t_machine ON t_document.machine_id = t_machine.id
    JOIN t_line ON t_line.id = t_machine.line_id 
    JOIN t_product ON t_product.id = t_line.product_id 
    where t_document.status = 'Active'
    ORDER BY t_document.create_date DESC
    `;
  return sql.query(query);
};

//dcoument for dashboard menu Admin
export const getAllDocumentModels = () => {
  const query = `SELECT 
    t_document.id,
    t_document.title,
    t_document.create_date,
    t_document.description,
    t_document.user_id,
    t_document.status,
    t_document.file_type,
    t_document.project_id,
    t_users.username,
    t_users.photo,
    t_users.email,
    t_document.machine_id,
    t_machine.machine_name,
    t_machine.line_id,
    t_line.line_name,
    t_line.product_id,
    t_product.product_name
    FROM t_document JOIN t_users ON t_document.user_id = t_users.id
    JOIN t_machine ON t_document.machine_id = t_machine.id
    JOIN t_line ON t_line.id = t_machine.line_id 
    JOIN t_product ON t_product.id = t_line.product_id 
    ORDER BY t_document.create_date DESC
    `;
  return sql.query(query);
};

export const getAllDocumentByUserIdModels = (userId) => {
  const query = `SELECT 
  t_document.id,
  t_document.title,
  t_document.create_date,
  t_document.description,
  t_document.user_id,
  t_document.status,
  t_document.file_type,
  t_document.project_id,
  t_users.username,
  t_users.photo,
  t_users.email,
  t_document.machine_id,
  t_machine.machine_name,
  t_machine.line_id,
  t_line.line_name,
  t_line.product_id,
  t_product.product_name
  FROM t_document JOIN t_users ON t_document.user_id = t_users.id
  JOIN t_machine ON t_document.machine_id = t_machine.id
  JOIN t_line ON t_line.id = t_machine.line_id 
  JOIN t_product ON t_product.id = t_line.product_id
  WHERE t_document.user_id = ${userId} ORDER BY t_document.create_date DESC`;

  return sql.query(query);
};

//search document for searchEngine
export const searchAllDocumentModels = (searchValue) => {
  const query = `SELECT 
    t_document.id,
    t_document.title,
    t_document.create_date,
    t_document.description,
    t_document.user_id,
    t_document.status,
    t_document.file_type,
    t_document.project_id,
    t_users.username,
    t_users.photo,
    t_users.email,
    t_document.machine_id,
    t_machine.machine_name,
    t_machine.line_id,
    t_line.line_name,
    t_line.product_id,
    t_product.product_name
    FROM t_document JOIN t_users ON t_document.user_id = t_users.id
    JOIN t_machine ON t_document.machine_id = t_machine.id
    JOIN t_line ON t_line.id = t_machine.line_id 
    JOIN t_product ON t_product.id = t_line.product_id
    WHERE (t_document.machine_id like '%${searchValue}%' or
    t_document.title like '%${searchValue}%' or 
    t_document.description like '%${searchValue}%' or 
    t_machine.machine_name like '%${searchValue}%' or
    t_line.line_name like '%${searchValue}%' or 
    t_product.product_name like '%${searchValue}%') 
    and t_document.status='Active'    
    ORDER BY t_document.create_date DESC
    `;
  return sql.query(query);
};

//search document for user menu
export const searchDocumentForUserModels = (userId, searchValue) => {
  const query = `SELECT 
    t_document.id,
    t_document.title,
    t_document.create_date,
    t_document.description,
    t_document.user_id,
    t_document.status,
    t_document.file_type,
    t_document.project_id,
    t_users.username,
    t_users.photo,
    t_users.email,
    t_document.machine_id,
    t_machine.machine_name,
    t_machine.line_id,
    t_line.line_name,
    t_line.product_id,
    t_product.product_name
    FROM t_document JOIN t_users ON t_document.user_id = t_users.id
    JOIN t_machine ON t_document.machine_id = t_machine.id
    JOIN t_line ON t_line.id = t_machine.line_id 
    JOIN t_product ON t_product.id = t_line.product_id
    WHERE (t_document.machine_id like '%${searchValue}%' or
    t_document.title like '%${searchValue}%' or 
    t_document.description like '%${searchValue}%' or 
    t_machine.machine_name like '%${searchValue}%' or
    t_line.line_name like '%${searchValue}%' or 
    t_product.product_name like '%${searchValue}%' or
    t_document.status like '%${searchValue}%') AND
    t_document.user_id=${userId} 
    ORDER BY t_document.create_date DESC
    `;
  return sql.query(query);
};

//search document for admin menu
export const searchDocumentForAdminModels = (searchValue) => {
  const query = `SELECT 
    t_document.id,
    t_document.title,
    t_document.create_date,
    t_document.description,
    t_document.user_id,
    t_document.status,
    t_users.username,
    t_users.photo,
    t_users.email,
    t_document.machine_id,
    t_document.file_type,
    t_document.project_id,
    t_machine.machine_name,
    t_machine.line_id,
    t_line.line_name,
    t_line.product_id,
    t_product.product_name
    FROM t_document JOIN t_users ON t_document.user_id = t_users.id
    JOIN t_machine ON t_document.machine_id = t_machine.id
    JOIN t_line ON t_line.id = t_machine.line_id 
    JOIN t_product ON t_product.id = t_line.product_id
    WHERE t_document.machine_id like '%${searchValue}%' or
    t_document.title like '%${searchValue}%' or 
    t_document.description like '%${searchValue}%' or 
    t_machine.machine_name like '%${searchValue}%' or
    t_line.line_name like '%${searchValue}%' or 
    t_product.product_name like '%${searchValue}%' or
    t_document.status like '%${searchValue}%'
    ORDER BY t_document.create_date DESC
    `;
  return sql.query(query);
};

export const deleteDocumentByIdModels = (id) => {
  const query = `Delete from t_document where id = '${id}'`;
  return sql.query(query);
};

export const changeStatusDocumentModels = (data) => {
  const query = `UPDATE t_document SET 
  status = '${data.status}' WHERE id = '${data.id}'`;
  return sql.query(query);
};

export const getDocumentByIdModels = (id) => {
  const query = `SELECT 
  t_document.id,
  t_document.title,
  t_document.create_date,
  t_document.description,
  t_document.user_id,
  t_document.status,
  t_users.username,
  t_users.photo,
  t_users.email,
  t_document.machine_id,
  t_document.project_id,
  t_document.file_type,
  t_machine.machine_name,
  t_machine.line_id,
  t_line.line_name,
  t_line.product_id,
  t_product.product_name
  FROM t_document JOIN t_users ON t_document.user_id = t_users.id
  JOIN t_machine ON t_document.machine_id = t_machine.id
  JOIN t_line ON t_line.id = t_machine.line_id 
  JOIN t_product ON t_product.id = t_line.product_id 
  where t_document.id = '${id}'`;
  return sql.query(query);
};

export const getDocumentByProjectIdModels = (id) => {
  const query = `SELECT 
  t_document.id,
  t_document.title,
  t_document.create_date,
  t_document.description,
  t_document.user_id,
  t_document.status,
  t_users.username,
  t_users.photo,
  t_users.email,
  t_document.machine_id,
  t_document.project_id,
  t_document.file_type,
  t_machine.machine_name,
  t_machine.line_id,
  t_line.line_name,
  t_line.product_id,
  t_product.product_name
  FROM t_document JOIN t_users ON t_document.user_id = t_users.id
  JOIN t_machine ON t_document.machine_id = t_machine.id
  JOIN t_line ON t_line.id = t_machine.line_id 
  JOIN t_product ON t_product.id = t_line.product_id 
  where t_document.project_id = '${id}'`;
  return sql.query(query);
};
