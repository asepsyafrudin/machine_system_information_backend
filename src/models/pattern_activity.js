import sql from "../config/sqlServerConfig.js";

export const createActivityPatternModels = (data) => {
  const query = `INSERT INTO [dbo].[t_pattern_activity]
               ([id_pattern],
                [id_activity]
               ,[name]
               ,[type]
               ,[range_from_start]
               ,[range_activity]
               ,[dependencies])
         VALUES (
            '${data.id_pattern}',
            '${data.id_activity}',
            '${data.name}',
            '${data.type}',
            '${parseInt(data.range_from_start)}',
            '${parseInt(data.range_activity)}',
            '${data.dependencies}'
         ) `;
  return sql.query(query);
};

export const getAllActivityPatternModels = (offset, limit) => {
  const query = `SELECT 
        t_pattern_activity.id_pattern,
        t_pattern_activity.name,
        t_pattern_activity.type,
        t_pattern_activity.range_from_start,
        t_pattern_activity.range_activity,
        t_pattern_activity.dependencies
        FROM t_pattern_activity desc OFFSET ${offset} ROWS
        FETCH NEXT ${limit} ROWS ONLY`;
  return sql.query(query);
};

export const getActivityPatternByIdModels = (id) => {
  const query = `SELECT * FROM t_pattern_activity WHERE id='${id}'`;
  return sql.query(query);
};

export const getAllActivityPatternByPatternIdModels = (id) => {
  const query = `SELECT 
        t_pattern_activity.id_pattern,
        t_pattern_activity.id_activity,
        t_pattern_activity.name,
        t_pattern_activity.type,
        t_pattern_activity.range_from_start,
        t_pattern_activity.range_activity,
        t_pattern_activity.dependencies
        FROM t_pattern_activity left
        JOIN t_pattern ON t_pattern_activity.id_pattern = t_pattern.id
        WHERE t_pattern_activity.id_pattern = '${id}'`;
  return sql.query(query);
};

export const updateActivityPatternModels = (data) => {
  const query = `UPDATE t_pattern_activity SET
        name = '${data.name}',
        type = '${data.type}',
        range_from_start = '${data.range_from_start}',
        range_activity = '${data.range_activity}',
        dependencies = '${data.dependencies}'
        WHERE id = ${data.id}`;
  return sql.query(query);
};

export const deleteActivityPatternModels = (id) => {
  const query = `DELETE FROM t_pattern_activity WHERE id = ${id}`;
  return sql.query(query);
};
