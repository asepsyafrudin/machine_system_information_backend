import db from "../config/db.js";

export const createProjectModels = (data) => {
  const sql = `INSERT INTO t_project SET 
        id = '${data.id}',
        product_id = ${data.product_id},
        project_name = '${data.project_name}',
        manager_id = ${data.manager_id},
        budget = '${data.budget}',
        saving_cost = '${data.saving_cost}',
        start  = '${data.start}',
        finish = '${data.finish}',
        user_id = ${data.user_id},
        description = '${data.description}',
        status = '${data.status}'
    `;
  return db.execute(sql);
};

export const updateProjectModels = (data) => {
  const sql = `UPDATE t_project SET
    product_id = ${data.product_id},
    project_name = '${data.project_name}',
    manager_id = ${data.manager_id},
    budget = '${data.budget}',
    saving_cost = '${data.saving_cost}',
    start  = '${data.start}',
    finish = '${data.finish}',
    description = '${data.description}',
    user_id = ${data.user_id} WHERE
    id = '${data.id}'
`;
  return db.execute(sql);
};

export const getAllProjectModels = (limit, offset) => {
  const sql = `SELECT 
  t_project.id, 
  t_project.product_id,
  t_project.project_name,
  t_project.manager_id,
  t_project.budget,
  t_project.saving_cost,
  t_project.start,
  t_project.finish,
  t_project.description,
  t_project.user_id,
  t_product.product_name,
  t_product.section_id,
  t_section.section_name
  FROM t_project 
  JOIN t_product ON t_project.product_id = t_product.id
  JOIN t_section ON t_product.section_id = t_section.id
  ORDER BY t_project.start ASC LIMIT ${offset},${limit}
    `;
  return db.execute(sql);
};

export const getProjectByIdModels = (id) => {
  const sql = `SELECT 
  t_project.id, 
  t_project.product_id,
  t_project.project_name,
  t_project.manager_id,
  t_project.budget,
  t_project.saving_cost,
  t_project.start,
  t_project.finish,
  t_project.description,
  t_project.user_id,
  t_product.product_name,
  t_product.section_id,
  t_section.section_name
  FROM t_project 
  JOIN t_product ON t_project.product_id = t_product.id
  JOIN t_section ON t_product.section_id = t_section.id
  WHERE t_project.id = '${id}'`;
  return db.execute(sql);
};

export const countGetAllProjectModels = () => {
  const sql = `SELECT 
  t_project.id, 
  t_project.product_id,
  t_project.project_name,
  t_project.manager_id,
  t_project.budget,
  t_project.saving_cost,
  t_project.start,
  t_project.finish,
  t_project.description,
  t_project.user_id,
  t_product.product_name,
  t_product.section_id,
  t_section.section_name
  FROM t_project 
  JOIN t_product ON t_project.product_id = t_product.id
  JOIN t_section ON t_product.section_id = t_section.id
      `;
  return db.execute(sql);
};

export const updateStatusProjectModels = (id, status) => {
  const sql = `UPDATE t_project SET status = '${status}' WHERE id = '${id}'`;
  return db.execute(sql);
};

export const deleteProjectByProjectIdModels = (id) => {
  const sql = `DELETE from t_project WHERE id = '${id}'`;
  return db.execute(sql);
};

export const getProjectByProductIdModels = (productId) => {
  const sql = `SELECT 
  t_project.id, 
  t_project.product_id,
  t_project.project_name,
  t_project.manager_id,
  t_project.budget,
  t_project.saving_cost,
  t_project.start,
  t_project.finish,
  t_project.description,
  t_project.user_id,
  t_product.product_name,
  t_product.section_id,
  t_section.section_name
  FROM t_project 
  JOIN t_product ON t_project.product_id = t_product.id
  JOIN t_section ON t_product.section_id = t_section.id
  WHERE t_project.product_id = '${productId}' ORDER BY t_project.start ASC`;
  return db.execute(sql);
};

export const getProjectByDateRangeModels = (fromDate, toDate) => {
  const sql = `SELECT 
  t_project.id, 
  t_project.product_id,
  t_project.project_name,
  t_project.manager_id,
  t_project.budget,
  t_project.saving_cost,
  t_project.start,
  t_project.finish,
  t_project.description,
  t_project.user_id,
  t_product.product_name,
  t_product.section_id,
  t_section.section_name
  FROM t_project 
  JOIN t_product ON t_project.product_id = t_product.id
  JOIN t_section ON t_product.section_id = t_section.id
  WHERE t_project.start >= '${fromDate}' AND t_project.finish <= '${toDate}' ORDER BY t_project.start ASC`;
  return db.execute(sql);
};

export const getProjectByProductIdAndDateRange = (
  fromDate,
  toDate,
  productId
) => {
  const sql = `SELECT 
  t_project.id, 
  t_project.product_id,
  t_project.project_name,
  t_project.manager_id,
  t_project.budget,
  t_project.saving_cost,
  t_project.start,
  t_project.finish,
  t_project.description,
  t_project.user_id,
  t_product.product_name,
  t_product.section_id,
  t_section.section_name
  FROM t_project 
  JOIN t_product ON t_project.product_id = t_product.id
  JOIN t_section ON t_product.section_id = t_section.id
  WHERE (t_project.start >= '${fromDate}' AND t_project.finish <= '${toDate}') and t_project.product_id = '${productId}' ORDER BY t_project.start ASC`;
  return db.execute(sql);
};

export const getProjectBySectionId = (id) => {
  const sql = `SELECT 
  t_project.id, 
  t_project.product_id,
  t_project.project_name,
  t_project.manager_id,
  t_project.budget,
  t_project.saving_cost,
  t_project.start,
  t_project.finish,
  t_project.description,
  t_project.user_id,
  t_product.product_name,
  t_product.section_id,
  t_section.section_name
  FROM t_project 
  JOIN t_product ON t_project.product_id = t_product.id
  JOIN t_section ON t_product.section_id = t_section.id
  WHERE t_product.section_id = ${id} `;

  return db.execute(sql);
};
