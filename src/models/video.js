import db from "../config/db.js";

export const createVideoModels = (data, filename, id) => {
  const sql = `INSERT INTO t_video SET
    id ='${id}',
    video_name = '${data.video_name}',
    machine_id = '${data.machine_id}',
    user_id = ${data.user_id},
    video_url ='${filename}',
    description = '${data.description}',
    status ='${data.status}'`;

  return db.execute(sql);
};

export const getAllVideoModels = () => {
  const sql = `SELECT 
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
  return db.execute(sql);
};

export const updateVideoModels = (data, filename) => {
  const sql = `UPDATE t_video SET 
    video_name = '${data.video_name}',
    machine_id = '${data.machine_id}',
    user_id = ${data.user_id},
    video_url ='${filename}',
    description = '${data.description}',
    status ='${data.status}'
    where id='${data.id}'`;

  return db.execute(sql);
};

export const deleteVideoModels = (id) => {
  const sql = `DELETE from t_video where id = '${id}'`;
  return db.execute(sql);
};

export const updateStatusVideoModels = (data) => {
  const sql = `UPDATE t_video SET 
    status = '${data.status}' where id = '${data.id}'`;
  return db.execute(sql);
};

export const getVideoByIdModels = (id) => {
  const sql = `SELECT 
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
  return db.execute(sql);
};

export const getVideoByUserIdModels = (userId) => {
  const sql = `SELECT 
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
  return db.execute(sql);
};

export const getAllVideoForAdminModels = () => {
  const sql = `SELECT 
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
  return db.execute(sql);
};

//search Video for SearchEngine
export const searchVideoModels = (searchValue) => {
  const sql = `SELECT 
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

  return db.execute(sql);
};

//search Video for User Menu
export const searchVideoForUserModels = (userId, searchValue) => {
  const sql = `SELECT 
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
  return db.execute(sql);
};

//search Video for Admin Menu
export const searchVideoForAdminModels = (searchValue) => {
  const sql = `SELECT 
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

  return db.execute(sql);
};
