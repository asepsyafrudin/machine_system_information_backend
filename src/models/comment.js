
import sql from "../config/sqlServerConfig.js"

export const createCommentModels = (data) => {
  const query = `INSERT INTO [dbo].[t_comment]
  ([user_id]
  ,[selected_item]
  ,[selected_id]
  ,[comment])
VALUES
  (${data.user_id}
  ,'${data.selected_item}'
  ,'${data.selected_id}'
  ,'${data.comment}'`;

  return sql.query(query);
};
// export const createCommentModels = (data) => {
//   const query = `INSERT INTO t_comment SET 
//     user_id = ${data.user_id},
//     selected_item = '${data.selected_item}',
//     selected_id = '${data.selected_id}',
//     comment ='${data.comment}'`;

//   return sql.query(query);
// };

export const getCommentBySelectedIdModels = (id) => {
  const query = `SELECT t_comment.id, 
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
  return sql.query(query);
};

export const deleteCommentModels = (id) => {
  const query = `DELETE from t_comment where id='${id}'`;
  return sql.query(query);
};

export const getCommentByCommentId = (id) => {
  const query = `SELECT t_comment.id, 
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
  return sql.query(query);
};
