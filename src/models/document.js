import db from "../config/db.js";

export const createDocumentModels = (data) => {
  const sql = `INSERT INTO t_document SET 
    id = '${data.id}',
    title = '${data.title}',
    machine_id = '${data.machine_id}',
    user_id=${parseInt(data.user_id)},
    create_date = '${data.create_date}',
    file_type ='${data.file_type}',
    description='${data.description}',
    status ='${data.status}'`;
  return db.execute(sql);
};

export const updateDocumentByIdModels = (data) => {
  const sql = `UPDATE t_document SET
    title = '${data.title}',
    machine_id = '${data.machine_id}',
    user_id=${parseInt(data.user_id)},
    create_date = '${data.create_date}',
    file_type ='${data.file_type}',
    description='${data.description}'
    WHERE id = '${data.id}'`;
  return db.execute(sql);
};

export const getAllDocumentModels = () => {
  const sql = `SELECT 
    t_document.id,
    t_document.title,
    t_document.create_date,
    t_document.description,
    t_document.user_id,
    t_document.status,
    t_document.file_type,
    t_users.username,
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
    ORDER BY t_document.id DESC
    `;
  return db.execute(sql);
};

export const getAllDocumentByUserIdModels = (userId) => {
  const sql = `SELECT 
  t_document.id,
  t_document.title,
  t_document.create_date,
  t_document.description,
  t_document.user_id,
  t_document.status,
  t_document.file_type,
  t_users.username,
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
  WHERE t_document.user_id = ${userId} ORDER BY t_document.id DESC`;

  return db.execute(sql);
};

//search document for searchEngine
export const searchAllDocumentModels = (searchValue) => {
  const sql = `SELECT 
    t_document.id,
    t_document.title,
    t_document.create_date,
    t_document.description,
    t_document.user_id,
    t_document.status,
    t_document.file_type,
    t_users.username,
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
    WHERE t_document.machine_id like '%${searchValue}%' or
    t_document.title like '%${searchValue}%' or 
    t_document.description like '%${searchValue}%' or 
    t_machine.machine_name like '%${searchValue}%' or
    t_line.line_name like '%${searchValue}%' or 
    t_product.product_name like '%${searchValue}%' 
    and t_document.status='Active'    
    ORDER BY t_document.id DESC
    `;
  return db.execute(sql);
};

//search document for user menu
export const searchDocumentForUserModels = (userId, searchValue) => {
  const sql = `SELECT 
    t_document.id,
    t_document.title,
    t_document.create_date,
    t_document.description,
    t_document.user_id,
    t_document.status,
    t_document.file_type,
    t_users.username,
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
    WHERE t_document.machine_id like '%${searchValue}%' or
    t_document.title like '%${searchValue}%' or 
    t_document.description like '%${searchValue}%' or 
    t_machine.machine_name like '%${searchValue}%' or
    t_line.line_name like '%${searchValue}%' or 
    t_product.product_name like '%${searchValue}%' 
    and t_document.user_id = ${userId}
    ORDER BY t_document.id DESC
    `;
  return db.execute(sql);
};

//search document for admin menu
export const searchDocumentForAdminModels = (searchValue) => {
  const sql = `SELECT 
    t_document.id,
    t_document.title,
    t_document.create_date,
    t_document.description,
    t_document.user_id,
    t_document.status,
    t_users.username,
    t_document.machine_id,
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
    WHERE t_document.machine_id like '%${searchValue}%' or
    t_document.title like '%${searchValue}%' or 
    t_document.description like '%${searchValue}%' or 
    t_machine.machine_name like '%${searchValue}%' or
    t_line.line_name like '%${searchValue}%' or 
    t_product.product_name like '%${searchValue}%'
    ORDER BY t_document.id DESC
    `;
  return db.execute(sql);
};

export const deleteDocumentByIdModels = (id) => {
  const sql = `Delete from t_document where id = '${id}'`;
  return db.execute(sql);
};

export const changeStatusDocumentModels = (data) => {
  const sql = `UPDATE t_document SET 
  status = '${data.status}' WHERE id = '${data.id}'`;
  return db.execute(sql);
};

export const getDocumentByIdModels = (id) => {
  const sql = `SELECT 
  t_document.id,
  t_document.title,
  t_document.create_date,
  t_document.description,
  t_document.user_id,
  t_document.status,
  t_users.username,
  t_document.machine_id,
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
  return db.execute(sql);
};
