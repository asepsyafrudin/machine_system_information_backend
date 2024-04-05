
import sql from "../config/sqlServerConfig.js";

export const createCapabilityModels = (data, id) => {
  const query = `INSERT INTO [dbo].[t_capability]
  ([id]
  ,[user_id]
  ,[machine_id]
  ,[part_name]
  ,[part_number]
  ,[item_check]
  ,[file_type]
  ,[type]
  ,[sigma]
  ,[standard]
  ,[standard_max]
  ,[standard_min]
  ,[description]
  ,[status]
  ,[project_id])
VALUES
  ('${id}'
  ,'${data.user_id}'
  ,'${data.machine_id}'
  ,'${data.part_name}'
  ,'${data.part_number}'
  ,'${data.item_check}'
  ,'capability'
  ,'${data.type}'
  ,'${data.sigma}'
  ,'${data.standard}'
  ,'${data.standard_max}'
  ,'${data.standard_min}'
  ,'${data.description}'
  ,'${data.status}'
  ,'${data.project_id}')
    `;
  return sql.query(query);
};

// export const updateCapabilityModels = (data) => {
//   const query = `UPDATE t_capability SET 
//     user_id = '${data.user_id}',
//     machine_id = '${data.machine_id}',  
//     part_name = '${data.part_name}',
//     part_number = '${data.part_number}',
//     item_check = '${data.item_check}',
//     file_type = 'capability',
//     type = '${data.type}',
//     sigma = '${data.sigma}',
//     standard = '${data.standard}',
//     standard_max = '${data.standard_max}',
//     standard_min = '${data.standard_min}',
//     description = '${data.description}',
//     status = '${data.status}',
//     project_id = '${data.project_id}'
//     where id = '${data.id}'`;
//   return sql.query(query);
// };
export const updateCapabilityModels = (data) => {
  const query = `UPDATE t_capability SET 
    user_id = '${data.user_id}',
    machine_id = '${data.machine_id}',  
    part_name = '${data.part_name}',
    part_number = '${data.part_number}',
    item_check = '${data.item_check}',
    file_type = 'capability',
    type = '${data.type}',
    sigma = '${data.sigma}',
    standard = '${data.standard}',
    standard_max = '${data.standard_max}',
    standard_min = '${data.standard_min}',
    description = '${data.description}',
    status = '${data.status}',
    project_id = '${data.project_id}'
    where id = '${data.id}'`;
  return sql.query(query);
};

export const getAllCapabilityForRecent = () => {
  const query = `SELECT t_capability.id,
  t_capability.part_name, 
  t_capability.part_number,
  t_capability.create_date,
  t_capability.item_check,
  t_capability.file_type,
  t_capability.type,
  t_capability.sigma,
  t_capability.standard,
  t_capability.standard_max,
  t_capability.standard_min,
  t_capability.description,
  t_capability.user_id,
  t_capability.status,
  t_capability.project_id,
  t_users.username,
  t_capability.machine_id,
  t_machine.machine_name,
  t_machine.line_id,
  t_line.line_name,
  t_line.product_id,
  t_product.product_name 
  from t_capability JOIN t_users ON 
  t_capability.user_id = t_users.id JOIN t_machine ON
  t_capability.machine_id = t_machine.id JOIN t_line ON 
  t_machine.line_id = t_line.id JOIN t_product ON
  t_line.product_id = t_product.id where t_machine.status = 'Active'`;

  return sql.query(query);
};

export const getAllCapabilityModels = (limit, offset) => {
  const query = `SELECT t_capability.id,
    t_capability.part_name, 
    t_capability.part_number,
    t_capability.create_date,
    t_capability.item_check,
    t_capability.file_type,
    t_capability.type,
    t_capability.sigma,
    t_capability.standard,
    t_capability.standard_max,
    t_capability.standard_min,
    t_capability.description,
    t_capability.user_id,
    t_capability.status,
    t_capability.project_id,
    t_users.username,
    t_capability.machine_id,
    t_machine.machine_name,
    t_machine.line_id,
    t_line.line_name,
    t_line.product_id,
    t_product.product_name 
    from t_capability JOIN t_users ON 
    t_capability.user_id = t_users.id JOIN t_machine ON
    t_capability.machine_id = t_machine.id JOIN t_line ON 
    t_machine.line_id = t_line.id JOIN t_product ON
    t_line.product_id = t_product.id where t_machine.status = 'Active' 
    ORDER BY t_capability.create_date desc OFFSET ${offset} ROWS
    FETCH NEXT ${limit} ROWS ONLY
    `;
  return sql.query(query);
};

export const getCapabilityByUserIdModels = (limit, offset, userId) => {
  const query = `SELECT t_capability.id,
      t_capability.part_name, 
      t_capability.part_number,
      t_capability.create_date,
      t_capability.item_check,
      t_capability.file_type,
      t_capability.type,
      t_capability.sigma,
      t_capability.standard,
      t_capability.standard_max,
      t_capability.standard_min,
      t_capability.description,
      t_capability.user_id,
      t_capability.status,
      t_capability.project_id,
      t_users.username,
      t_capability.machine_id,
      t_machine.machine_name,
      t_machine.line_id,
      t_line.line_name,
      t_line.product_id,
      t_product.product_name 
      from t_capability JOIN t_users ON 
      t_capability.user_id = t_users.id JOIN t_machine ON
      t_capability.machine_id = t_machine.id JOIN t_line ON 
      t_machine.line_id = t_line.id JOIN t_product ON
      t_line.product_id = t_product.id 
      where t_machine.status = 'Active' and t_users.id = ${userId} 
      ORDER BY t_capability.create_date desc OFFSET ${offset} ROWS
      FETCH NEXT ${limit} ROWS ONLY
      `;
  return sql.query(query);
};

export const getCapabilityByIdModels = (id) => {
  const query = `SELECT t_capability.id,
    t_capability.part_name, 
    t_capability.part_number,
    t_capability.create_date,
    t_capability.item_check,
    t_capability.file_type,
    t_capability.type,
    t_capability.sigma,
    t_capability.standard,
    t_capability.standard_max,
    t_capability.standard_min,
    t_capability.description,
    t_capability.user_id,
    t_capability.status,
    t_capability.project_id,
    t_users.username,
    t_capability.machine_id,
    t_machine.machine_name,
    t_machine.line_id,
    t_line.line_name,
    t_line.product_id,
    t_product.product_name 
    from t_capability JOIN t_users ON 
    t_capability.user_id = t_users.id JOIN t_machine ON
    t_capability.machine_id = t_machine.id JOIN t_line ON 
    t_machine.line_id = t_line.id JOIN t_product ON
    t_line.product_id = t_product.id where t_capability.id = '${id}' 
    and t_machine.status = 'Active' ORDER BY t_capability.create_date desc`;

  return sql.query(query);
};

export const getCapabilityByProjectIdModels = (id) => {
  const query = `SELECT t_capability.id,
    t_capability.part_name, 
    t_capability.part_number,
    t_capability.create_date,
    t_capability.item_check,
    t_capability.file_type,
    t_capability.type,
    t_capability.sigma,
    t_capability.standard,
    t_capability.standard_max,
    t_capability.standard_min,
    t_capability.description,
    t_capability.user_id,
    t_capability.status,
    t_capability.project_id,
    t_users.username,
    t_capability.machine_id,
    t_machine.machine_name,
    t_machine.line_id,
    t_line.line_name,
    t_line.product_id,
    t_product.product_name 
    from t_capability JOIN t_users ON 
    t_capability.user_id = t_users.id JOIN t_machine ON
    t_capability.machine_id = t_machine.id JOIN t_line ON 
    t_machine.line_id = t_line.id JOIN t_product ON
    t_line.product_id = t_product.id where t_capability.project_id = '${id}' 
    and t_machine.status = 'Active' ORDER BY t_capability.create_date desc`;

  return sql.query(query);
};

export const deleteCapabilityModels = (capabilityId) => {
  const query = `DELETE from t_capability where id = '${capabilityId}'`;
  return sql.query(query);
};

export const countCapabilityModels = () => {
  const query = `SELECT COUNT(id) as count FROM t_capability`;
  return sql.query(query);
};

export const searchCapabilityModels = (searchValue, offset, limit) => {
  const query = `SELECT t_capability.id,
    t_capability.part_name, 
    t_capability.part_number,
    t_capability.create_date,
    t_capability.item_check,
    t_capability.file_type,
    t_capability.type,
    t_capability.sigma,
    t_capability.standard,
    t_capability.standard_max,
    t_capability.standard_min,
    t_capability.description,
    t_capability.user_id,
    t_capability.status,
    t_capability.project_id,
    t_users.username,
    t_capability.machine_id,
    t_machine.machine_name,
    t_machine.line_id,
    t_line.line_name,
    t_line.product_id,
    t_product.product_name 
    from t_capability JOIN t_users ON 
    t_capability.user_id = t_users.id JOIN t_machine ON
    t_capability.machine_id = t_machine.id JOIN t_line ON 
    t_machine.line_id = t_line.id JOIN t_product ON
    t_line.product_id = t_product.id where 
    t_product.product_name like '%${searchValue}%' or
    t_line.line_name like '%${searchValue}%' or
    t_machine.machine_name like '%${searchValue}%' or 
    t_capability.item_check like '%${searchValue}%' or
    t_capability.description like '%${searchValue}%' or
    t_capability.part_name like '%${searchValue}%' or 
    t_capability.part_number like '%${searchValue}%' 
    or t_users.username like '%${searchValue}%'
    and
    t_machine.status = 'Active' 
    ORDER BY t_capability.create_date desc OFFSET ${offset} ROWS
    FETCH NEXT ${limit} ROWS ONLY
    `;

  return sql.query(query);
};
