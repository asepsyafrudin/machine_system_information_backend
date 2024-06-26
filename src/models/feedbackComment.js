import sql from "../config/sqlServerConfig.js"

export const createFeedbackModels = (data) => {
  const query = `INSERT INTO [dbo].[t_feedback_comment]
  ([comment_id]
  ,[feedback]
  ,[user_id])
VALUES
  (${parseInt(data.comment_id)}
  ,'${data.feedback}'
  ,${parseInt(data.user_id)})`;

  return sql.query(query);
};
// export const createFeedbackModels = (data) => {
//   const query = `INSERT INTO t_feedback_comment SET 
//     comment_id =${parseInt(data.comment_id)},
//     feedback ='${data.feedback}',
//     user_id = ${parseInt(data.user_id)}`;

//   return sql.query(query);
// };

export const deleteFeedbackModels = (id) => {
  const query = `DELETE from t_feedback_comment where id = ${id}`;
  return sql.query(query);
};

export const getFeedbackByCommentId = (commentId) => {
  const query = `SELECT t_feedback_comment.id,
    t_feedback_comment.feedback,
    t_feedback_comment.user_id,
    t_feedback_comment.create_date,
    t_comment.selected_id,
    t_comment.selected_item,
    t_users.username,
    t_users.email,
    t_users.photo FROM t_feedback_comment JOIN t_users 
    ON t_feedback_comment.user_id = t_users.id 
    JOIN t_comment ON t_comment.id = t_feedback_comment.comment_id
    WHERE t_feedback_comment.comment_id = ${commentId} 
    ORDER BY t_feedback_comment.id ASC`;
  return sql.query(query);
};

export const getFeedbackByIdModels = (id) => {
  const query = `SELECT * from t_feedback_comment where id = ${id}`;
  return sql.query(query);
};
