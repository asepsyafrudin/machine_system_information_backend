import db from "../config/db.js";

export const createMachineModels = (data) => {
  const sql = `INSERT INTO t_machine SET
    id = '${data.id}',
    machine_name = '${data.machine_name}', 
    cycletime = '${data.cycletime}', 
    operation_ratio = '${data.operation_ratio}',
    masspro_date = '${data.masspro_date}',
    status = '${data.status}',
    description = '${data.description}',
    line_id = ${data.line_id}
    `;

  return db.execute(sql);
};

export const deleteMachineModels = (id) => {
  const sql = `DELETE FROM t_machine where id = '${id}'`;
  return db.execute(sql);
};

export const updateStatusMachineModels = (data) => {
  const sql = `UPDATE t_machine SET status = '${data.status}' where id = '${data.id}'`;
  return db.execute(sql);
};

export const updateMachineModels = (data) => {
  const sql = `UPDATE t_machine SET 
    machine_name = '${data.machine_name}', 
    cycletime = '${data.cycletime}', 
    operation_ratio = '${data.operation_ratio}',
    masspro_date = '${data.masspro_date}',
    description = '${data.description}',
    line_id = ${data.line_id}
    WHERE id = '${data.id}'
    `;
  return db.execute(sql);
};

export const getAllMachineModels = () => {
  const sql = `SELECT 
    t_machine.id , 
    t_machine.machine_name,
    t_machine.cycletime,
    t_machine.operation_ratio,
    t_machine.masspro_date,
    t_machine.status,
    t_machine.description,
    t_machine.line_id,
    t_line.line_name,
    t_line.product_id,
    t_product.product_name
    FROM t_machine JOIN t_line ON 
    t_machine.line_id = t_line.id 
    JOIN t_product ON 
    t_line.product_id = t_product.id
    `;

  return db.execute(sql);
};

export const searchMachineModel = (searchValue) => {
  const sql = `SELECT 
    t_machine.id , 
    t_machine.machine_name,
    t_machine.cycletime,
    t_machine.operation_ratio,
    t_machine.masspro_date,
    t_machine.status,
    t_machine.description,
    t_machine.line_id,
    t_line.line_name,
    t_line.product_id,
    t_product.product_name
    FROM t_machine JOIN t_line ON 
    t_machine.line_id = t_line.id 
    JOIN t_product ON 
    t_line.product_id = t_product.id
    where 
    t_machine.machine_name like '%${searchValue}%'
    or t_line.line_name like '%${searchValue}%'
    or t_product.product_name like '%${searchValue}%' 
    `;
  return db.execute(sql);
};
