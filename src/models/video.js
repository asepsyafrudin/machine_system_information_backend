
import sql from "../config/sqlServerConfig.js";

export const createVideoModels = (data, filename, id) => {
  const query = `INSERT INTO [dbo].[t_video]
  ([id]
  ,[machine_id]
  ,[user_id]
  ,[video_name]
  ,[video_url]
  ,[description]
  ,[status]
  ,[project_id])
VALUES
  ('${id}'
  ,'${data.machine_id}'
  ,${data.user_id}
  ,'${data.video_name}'
  ,'${filename}'
  ,'${data.description}'
  ,'${data.status}'
  ,'${data.project_id}')`;

  return sql.query(query);
};
// export const createVideoModels = (data, filename, id) => {
//   const query = `INSERT INTO t_video SET
//     id ='${id}',
//     video_name = '${data.video_name}',
//     machine_id = '${data.machine_id}',
//     user_id = ${data.user_id},
//     video_url ='${filename}',
//     description = '${data.description}',
//     project_id = '${data.project_id}',
//     status ='${data.status}'`;

//   return sql.query(query);
// };

export const getAllVideoModels = () => {
  const query = `SELECT 
    t_video.id,
    t_video.user_id,
    t_users.username,
    t_users.photo,
    t_users.npk,
    t_users.email,
    t_video.id,
    t_video.video_name ,
    t_video.description,
    t_video.status,
    t_video.create_date,
    t_video.machine_id,
    t_video.video_url,
    t_video.project_id,
    t_machine.machine_name,
    t_machine.line_id,
    t_line.line_name,
    t_line.product_id,
    t_product.product_name
    FROM t_video JOIN t_machine ON 
    t_video.machine_id = t_machine.id JOIN t_line ON
    t_machine.line_id = t_line.id JOIN t_product ON
    t_line.product_id = t_product.id JOIN t_users ON
    t_users.id = t_video.user_id
    where t_video.status = 'Active'
    ORDER BY t_video.create_date desc 
    
    `;
  return sql.query(query);
};

export const updateVideoModels = (data, filename) => {
  const query = `UPDATE t_video SET 
    video_name = '${data.video_name}',
    machine_id = '${data.machine_id}',
    user_id = ${data.user_id},
    video_url ='${filename}',
    description = '${data.description}',
    status ='${data.status}',
    project_id = '${data.project_id}'
    where id='${data.id}'`;

  return sql.query(query);
};

export const deleteVideoModels = (id) => {
  const query = `DELETE from t_video where id = '${id}'`;
  return sql.query(query);
};

export const updateStatusVideoModels = (data) => {
  const query = `UPDATE t_video SET 
    status = '${data.status}' where id = '${data.id}'`;
  return sql.query(query);
};

export const getVideoByIdModels = (id) => {
  const query = `SELECT 
  t_video.id,
  t_video.user_id,
  t_users.username,
    t_users.photo,
    t_users.npk,
    t_users.email,
  t_video.video_name ,
  t_video.description,
  t_video.status,
  t_video.create_date,
  t_video.machine_id,
  t_video.video_url,
  t_video.project_id,
  t_machine.machine_name,
  t_machine.line_id,
  t_line.line_name,
  t_line.product_id,
  t_product.product_name
  FROM t_video JOIN t_machine ON 
  t_video.machine_id = t_machine.id JOIN t_line ON
  t_machine.line_id = t_line.id JOIN t_product ON
  t_line.product_id = t_product.id JOIN t_users ON
  t_users.id = t_video.user_id
  where t_video.id='${id}'`;
  return sql.query(query);
};

export const getVideoByUserIdModels = (userId) => {
  const query = `SELECT 
    t_video.id,
    t_video.user_id,
    t_users.username,
    t_users.photo,
    t_users.npk,
    t_users.email,
    t_video.video_name ,
    t_video.description,
    t_video.status,
    t_video.create_date,
    t_video.machine_id,
    t_video.video_url,
    t_video.project_id,
    t_machine.machine_name,
    t_machine.line_id,
    t_line.line_name,
    t_line.product_id,
    t_product.product_name
    FROM t_video JOIN t_machine ON 
    t_video.machine_id = t_machine.id JOIN t_line ON
    t_machine.line_id = t_line.id JOIN t_product ON
    t_line.product_id = t_product.id JOIN t_users ON
    t_users.id = t_video.user_id
    where t_video.user_id=${userId} ORDER BY t_video.create_date desc`;
  return sql.query(query);
};

export const getAllVideoForAdminModels = () => {
  const query = `SELECT 
    t_video.id,
    t_video.user_id,
    t_users.username,
    t_users.photo,
    t_users.npk,
    t_users.email,
    t_video.id,
    t_video.video_name ,
    t_video.description,
    t_video.status,
    t_video.create_date,
    t_video.machine_id,
    t_video.video_url,
    t_video.project_id,
    t_machine.machine_name,
    t_machine.line_id,
    t_line.line_name,
    t_line.product_id,
    t_product.product_name
    FROM t_video JOIN t_machine ON 
    t_video.machine_id = t_machine.id JOIN t_line ON
    t_machine.line_id = t_line.id JOIN t_product ON
    t_line.product_id = t_product.id JOIN t_users ON
    t_users.id = t_video.user_id
    ORDER BY t_video.create_date desc
    `;
  return sql.query(query);
};

//search Video for SearchEngine
export const searchVideoModels = (searchValue) => {
  const query = `SELECT 
    t_video.id,
    t_video.user_id,
    t_users.username,
    t_users.photo,
    t_users.npk,
    t_users.email,
    t_video.video_name ,
    t_video.description,
    t_video.status,
    t_video.create_date,
    t_video.machine_id,
    t_video.video_url,
    t_video.project_id,
    t_machine.machine_name,
    t_machine.line_id,
    t_line.line_name,
    t_line.product_id,
    t_product.product_name
    FROM t_video JOIN t_machine ON 
    t_video.machine_id = t_machine.id JOIN t_line ON
    t_machine.line_id = t_line.id JOIN t_product ON
    t_line.product_id = t_product.id JOIN t_users ON
    t_users.id = t_video.user_id
    WHERE (t_video.video_name like '%${searchValue}%'
    or t_video.machine_id like '%${searchValue}%'
    or t_line.line_name like '%${searchValue}%'
    or t_product.product_name like '%${searchValue}%')
    and t_video.status = 'Active' ORDER BY t_video.create_date desc `;

  return sql.query(query);
};

//search Video for User Menu
export const searchVideoForUserModels = (userId, searchValue) => {
  const query = `SELECT 
    t_video.id,
    t_video.user_id,
    t_users.username,
    t_users.photo,
    t_users.npk,
    t_users.email,
    t_video.video_name ,
    t_video.description,
    t_video.status,
    t_video.create_date,
    t_video.machine_id,
    t_video.video_url,
    t_video.project_id,
    t_machine.machine_name,
    t_machine.line_id,
    t_line.line_name,
    t_line.product_id,
    t_product.product_name
    FROM t_video JOIN t_machine ON 
    t_video.machine_id = t_machine.id JOIN t_line ON
    t_machine.line_id = t_line.id JOIN t_product ON
    t_line.product_id = t_product.id JOIN t_users ON
    t_users.id = t_video.user_id
    WHERE (t_video.video_name like '%${searchValue}%'
    or t_video.machine_id like '%${searchValue}%'
    or t_line.line_name like '%${searchValue}%'
    or t_product.product_name like '%${searchValue}%')
    and t_video.user_id = ${userId} ORDER BY t_video.create_date desc`;
  return sql.query(query);
};

//search Video for Admin Menu
export const searchVideoForAdminModels = (searchValue) => {
  const query = `SELECT 
    t_video.id,
    t_video.user_id,
    t_users.username,
    t_users.photo,
    t_users.npk,
    t_users.email,
    t_video.video_name ,
    t_video.description,
    t_video.status,
    t_video.create_date,
    t_video.machine_id,
    t_video.video_url,
    t_video.project_id,
    t_machine.machine_name,
    t_machine.line_id,
    t_line.line_name,
    t_line.product_id,
    t_product.product_name
    FROM t_video JOIN t_machine ON 
    t_video.machine_id = t_machine.id JOIN t_line ON
    t_machine.line_id = t_line.id JOIN t_product ON
    t_line.product_id = t_product.id JOIN t_users ON
    t_users.id = t_video.user_id
    WHERE t_video.video_name like '%${searchValue}%'
    or t_video.machine_id like '%${searchValue}%'
    or t_line.line_name like '%${searchValue}%'
    or t_product.product_name like '%${searchValue}%' ORDER BY t_video.create_date desc`;

  return sql.query(query);
};

export const getVideoByProjectIdModels = (id) => {
  const query = `SELECT 
  t_video.id,
  t_video.user_id,
  t_users.username,
    t_users.photo,
    t_users.npk,
    t_users.email,
  t_video.video_name ,
  t_video.description,
  t_video.status,
  t_video.create_date,
  t_video.machine_id,
  t_video.video_url,
  t_video.project_id,
  t_machine.machine_name,
  t_machine.line_id,
  t_line.line_name,
  t_line.product_id,
  t_product.product_name
  FROM t_video JOIN t_machine ON 
  t_video.machine_id = t_machine.id JOIN t_line ON
  t_machine.line_id = t_line.id JOIN t_product ON
  t_line.product_id = t_product.id JOIN t_users ON
  t_users.id = t_video.user_id
  where t_video.project_id='${id}'`;
  return sql.query(query);
};
