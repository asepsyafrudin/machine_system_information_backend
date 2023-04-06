import db from "../config/db.js";

export const createCommentModels = (data) => {
  const sql = `INSERT INTO t_comment SET 
    user_id = ${data.user_id},
    selected_item = '${data.selected_item}',
    selected_id = '${data.selected_id}',
    comment ='${data.comment}'`;

  return db.execute(sql);
};

export const getCommentBySelectedIdModels = (id) => {
  const sql = `SELECT t_comment.id, 
    t_comment.create_date,
    t_comment.comment,
    t_comment.user_id,
    t_users.username, 
    t_users.email,
    t_comment.selected_item,
    t_comment.selected_id,
    t_users.photo FROM t_comment JOIN t_users ON 
    t_comment.user_id = t_users.id where 
    t_comment.selected_id = '${id}' ORDER BY id DESC 
    `;
  return db.execute(sql);
};

export const deleteCommentModels = (id) => {
  const sql = `DELETE from t_comment where id='${id}'`;
  return db.execute(sql);
};

export const getCommentByCommentId = (id) => {
  const sql = `SELECT t_comment.id, 
    t_comment.create_date,
    t_comment.comment,
    t_comment.user_id,
    t_users.username, 
    t_users.email,
    t_comment.selected_item,
    t_comment.selected_id,
    t_users.photo FROM t_comment JOIN t_users ON 
    t_comment.user_id = t_users.id where 
    t_comment.id = ${id} ORDER BY id DESC 
    `;
  return db.execute(sql);
};
