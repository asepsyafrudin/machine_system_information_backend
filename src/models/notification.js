import db from "../config/db.js";

export const createNotificationModels = (data) => {
  const sql = `INSERT INTO t_notification SET user_id = ${data.user_id} , 
  link = '${data.link}' , type ="${data.type}", status = 'unread', user_comment_id = ${data.user_comment_id}`;

  return db.execute(sql);
};

export const getNotificationByUserIdModels = (userId) => {
  const sql = `SELECT t_notification.id,
  t_notification.type, 
  t_notification.link,
  t_notification.create_date,
  t_notification.user_comment_id, 
  t_users.username,
  t_users.photo
  FROM t_notification JOIN t_users ON
  t_notification.user_comment_id = t_users.id 
  where user_id = ${userId} and t_notification.status = 'unread'
  order by id desc limit 10
  `;
  return db.execute(sql);
};

export const changeStatusNotifToReadModels = (id) => {
  const sql = `UPDATE t_notification SET status="read" where id = ${id}`;
  return db.execute(sql);
};
