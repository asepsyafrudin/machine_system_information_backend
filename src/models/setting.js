import db from "../config/db.js";

export const saveSettingProjectActivityModel = (data) => {
  const sql = `
    INSERT INTO t_setting_project_activity SET 
    project_id = '${data.projectId}',
    column_width = '${data.columnWidth}',
    row_height = '${data.rowHeight}',
    list_cell_width = '${data.listCellWidth}',
    month_format = '${data.monthFormat}',
    hidden_plan = '${data.hiddenPlan}',
    switch_mode = ${data.switchMode}
    `;
  return db.execute(sql);
};

export const getSettingByProjectIdModels = (id) => {
  const sql = `SELECT * from t_setting_project_activity WHERE 
        project_id = '${id}'
    `;

  return db.execute(sql);
};

export const updateSettingProjectActivityModel = (data) => {
  const sql = `UPDATE t_setting_project_activity SET 
    column_width = '${data.columnWidth}',
    row_height = '${data.rowHeight}',
    list_cell_width = '${data.listCellWidth}',
    month_format = '${data.monthFormat}',
    hidden_plan = '${data.hiddenPlan}',
    switch_mode = ${data.switchMode}
    WHERE project_id = '${data.projectId}'`;

  return db.execute(sql);
};
