
import sql from "../config/sqlServerConfig.js";

export const saveSettingProjectActivityModel = (data) => {
  const query = `
  INSERT INTO [dbo].[t_setting_project_activity]
  ([project_id]
  ,[column_width]
  ,[row_height]
  ,[list_cell_width]
  ,[month_format]
  ,[hidden_plan]
  ,[switch_mode])
VALUES
  ('${data.projectId}'
  ,'${data.columnWidth}'
  ,'${data.rowHeight}'
  ,'${data.listCellWidth}'
  ,'${data.monthFormat}'
  ,'${data.hiddenPlan}'
  ,${data.switchMode})
    `;
  return sql.query(query);
};
// export const saveSettingProjectActivityModel = (data) => {
//   const query = `
//     INSERT INTO t_setting_project_activity SET 
//     project_id = '${data.projectId}',
//     column_width = '${data.columnWidth}',
//     row_height = '${data.rowHeight}',
//     list_cell_width = '${data.listCellWidth}',
//     month_format = '${data.monthFormat}',
//     hidden_plan = '${data.hiddenPlan}',
//     switch_mode = ${data.switchMode}
//     `;
//   return sql.query(query);
// };

export const getSettingByProjectIdModels = (id) => {
  const query = `SELECT * from t_setting_project_activity WHERE 
        project_id = '${id}'
    `;

  return sql.query(query);
};

export const updateSettingProjectActivityModel = (data) => {
  const query = `UPDATE t_setting_project_activity SET 
    column_width = '${data.columnWidth}',
    row_height = '${data.rowHeight}',
    list_cell_width = '${data.listCellWidth}',
    month_format = '${data.monthFormat}',
    hidden_plan = '${data.hiddenPlan}',
    switch_mode = ${data.switchMode}
    WHERE project_id = '${data.projectId}'`;

  return sql.query(query);
};
