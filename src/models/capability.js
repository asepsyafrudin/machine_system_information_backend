import db from "../config/db.js";

export const createCapabilityModels = (data, id) => {
  const sql = `INSERT INTO t_capability SET 
    id = '${id}',
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
    status = '${data.status}'
    `;
  return db.execute(sql);
};

export const updateCapabilityModels = (data) => {
  const sql = `UPDATE t_capability SET 
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
    status = '${data.status}'
    where id = '${data.id}'`;
  return db.execute(sql);
};

export const getAllCapabilityForRecent = () => {
  const sql = `SELECT t_capability.id,
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

  return db.execute(sql);
};

export const getAllCapabilityModels = (limit, offset) => {
  const sql = `SELECT t_capability.id,
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
    ORDER BY t_capability.create_date desc LIMIT ${offset},${limit}
    `;
  return db.execute(sql);
};

export const getCapabilityByUserIdModels = (limit, offset, userId) => {
  const sql = `SELECT t_capability.id,
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
      ORDER BY t_capability.create_date desc LIMIT ${offset},${limit} 
      `;
  return db.execute(sql);
};

export const getCapabilityByIdModels = (id) => {
  const sql = `SELECT t_capability.id,
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

  return db.execute(sql);
};

export const deleteCapabilityModels = (capabilityId) => {
  const sql = `DELETE from t_capability where id = '${capabilityId}'`;
  return db.execute(sql);
};

export const countCapabilityModels = () => {
  const sql = `SELECT COUNT(id) as count FROM t_capability`;
  return db.execute(sql);
};

export const searchCapabilityModels = (searchValue, offset, limit) => {
  const sql = `SELECT t_capability.id,
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
    ORDER BY t_capability.create_date desc LIMIT ${offset},${limit}
    `;

  return db.execute(sql);
};
