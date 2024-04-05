
import sql from "../config/sqlServerConfig.js";

export const createMachineModels = (data) => {
  const query = `INSERT INTO [dbo].[t_machine]
  ([id]
  ,[machine_name]
  ,[cycletime]
  ,[operation_ratio]
  ,[masspro_date]
  ,[description]
  ,[status]
  ,[line_id]
  ,[asset_id])
VALUES
  ('${data.id}'
  ,'${data.machine_name}'
  ,'${data.cycletime}'
  ,'${data.operation_ratio}'
  ,'${data.masspro_date}'
  ,'${data.description}'
  ,'${data.status}'
  ,${data.line_id}
  ,'${data.asset_id}')
    `;

  return sql.query(query);
};
// export const createMachineModels = (data) => {
//   const query = `INSERT INTO t_machine SET
//     id = '${data.id}',
//     machine_name = '${data.machine_name}', 
//     cycletime = '${data.cycletime}', 
//     operation_ratio = '${data.operation_ratio}',
//     masspro_date = '${data.masspro_date}',
//     asset_id ='${data.asset_id}',
//     status = '${data.status}',
//     description = '${data.description}',
//     line_id = ${data.line_id}
//     `;

//   return sql.query(query);
// };

export const deleteMachineModels = (id) => {
  const query = `DELETE FROM t_machine where id = '${id}'`;
  return sql.query(query);
};

export const updateStatusMachineModels = (data) => {
  const query = `UPDATE t_machine SET status = '${data.status}' where id = '${data.id}'`;
  return sql.query(query);
};

export const updateMachineModels = (data) => {
  const query = `UPDATE t_machine SET 
    machine_name = '${data.machine_name}', 
    asset_id ='${data.asset_id}',
    cycletime = '${data.cycletime}', 
    operation_ratio = '${data.operation_ratio}',
    masspro_date = '${data.masspro_date}',
    description = '${data.description}',
    line_id = ${data.line_id}
    WHERE id = '${data.id}'
    `;
  return sql.query(query);
};

export const getAllMachineModels = () => {
  const query = `SELECT 
    t_machine.id , 
    t_machine.machine_name,
    t_machine.cycletime,
    t_machine.asset_id,
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

  return sql.query(query);
};

export const searchMachineModel = (searchValue) => {
  const query = `SELECT 
    t_machine.id , 
    t_machine.machine_name,
    t_machine.cycletime,
    t_machine.asset_id,
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
  return sql.query(query);
};
