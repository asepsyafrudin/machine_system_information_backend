import sql from "../config/sqlServerConfig.js";

export const createProjectModels = (data) => {
  const query = `INSERT INTO [dbo].[t_project]
  ([id]
  ,[product_id]
  ,[project_name]
  ,[rank]
  ,[manager_id]
  ,[budget]
  ,[saving_cost]
  ,[start]
  ,[finish]
  ,[user_id]
  ,[status]
  ,[description]
  ,[category]
  ,[sub_category])
VALUES
  ('${data.id}'
  ,${data.product_id}
  ,'${data.project_name}'
  ,'${data.rank}'
  ,${data.manager_id}
  ,'${data.budget}'
  ,'${data.saving_cost}'
  ,'${data.start}'
  ,'${data.finish}'
  ,${data.user_id}
  ,'${data.status}'
  ,'${data.description}'
  ,'${data.category}'
  ,'${data.sub_category}')
    `;
  return sql.query(query);
};
// export const createProjectModels = (data) => {
//   const query = `INSERT INTO t_project SET
//         id = '${data.id}',
//         product_id = ${data.product_id},
//         project_name = '${data.project_name}',
//         manager_id = ${data.manager_id},
//         budget = '${data.budget}',
//         saving_cost = '${data.saving_cost}',
//         start  = '${data.start}',
//         finish = '${data.finish}',
//         category = '${data.category}',
//         user_id = ${data.user_id},
//         description = '${data.description}',
//         sub_category = '${data.sub_category}',
//         status = '${data.status}'
//     `;
//   return sql.query(query);
// };

export const updateProjectModels = (data) => {
  const query = `UPDATE t_project SET
    product_id = ${data.product_id},
    project_name = '${data.project_name}',
    rank = '${data.rank}',
    manager_id = ${data.manager_id},
    budget = '${data.budget}',
    saving_cost = '${data.saving_cost}',
    start  = '${data.start}',
    finish = '${data.finish}',
    category = '${data.category}',
    description = '${data.description}',
    sub_category = '${data.sub_category}'
    WHERE id = '${data.id}'
`;
  return sql.query(query);
};

export const updateProjectByDateModels = (id, start, finish) => {
  const query = `UPDATE t_project SET
  start = '${start}',
  finish = '${finish}'
  WHERE id = '${id}'  
  `;
  return sql.query(query);
};

export const cancelProjectModels = (id) => {
  const query = `UPDATE t_project SET status = 'cancel'
  WHERE id = '${id}'`;

  return sql.query(query);
};

export const getAllProjectModels = (limit, offset) => {
  const query = `SELECT 
  t_project.id, 
  t_project.product_id,
  t_project.project_name,
  t_project.rank,
  t_project.manager_id,
  t_project.budget,
  t_project.saving_cost,
  t_project.start,
  t_project.category,
  t_project.sub_category,
  t_project.finish,
  t_project.description,
  t_project.user_id,
  t_product.product_name,
  t_product.section_id,
  t_section.section_name,
  t_project.status,
  t_project.create_date
  FROM t_project 
  JOIN t_product ON t_project.product_id = t_product.id
  JOIN t_section ON t_product.section_id = t_section.id
  ORDER BY t_project.create_date desc OFFSET ${offset} ROWS
  FETCH NEXT ${limit} ROWS ONLY
    `;
  return sql.query(query);
};

export const getProjectByIdModels = (id) => {
  const query = `SELECT 
  t_project.id, 
  t_project.product_id,
  t_project.project_name,
  t_project.rank,
  t_project.manager_id,
  t_project.budget,
  t_project.saving_cost,
  t_project.start,
  t_project.finish,
  t_project.category,
  t_project.sub_category,
  t_project.description,
  t_project.user_id,
  t_product.product_name,
  t_product.section_id,
  t_section.section_name,
  t_project.status,
  t_project.create_date,
  t_project.summary_progress
  FROM t_project 
  JOIN t_product ON t_project.product_id = t_product.id
  JOIN t_section ON t_product.section_id = t_section.id
  WHERE t_project.id = '${id}'`;
  return sql.query(query);
};

export const countGetAllProjectModels = () => {
  const query = `SELECT 
  t_project.id, 
  t_project.product_id,
  t_project.project_name,
  t_project.rank,
  t_project.manager_id,
  t_project.budget,
  t_project.saving_cost,
  t_project.start,
  t_project.finish,
  t_project.category,
  t_project.sub_category,
  t_project.description,
  t_project.user_id,
  t_project.status,
  t_product.product_name,
  t_product.section_id,
  t_section.section_name,
  t_project.create_date,
  t_project.summary_progress
  FROM t_project 
  LEFT JOIN t_product ON t_project.product_id = t_product.id
  LEFT JOIN t_section ON t_product.section_id = t_section.id
  ORDER BY t_project.create_date DESC
      `;
  return sql.query(query);
};

export const getAllProjectTableModels = () => {
  const query = `select * from t_project ORDER BY t_project.create_date DESC`;
  return sql.query(query);
};

export const getAllProductTableModels = () => {
  const query = `select * from t_product`;
  return sql.query(query);
};

export const getALlSectionTableModels = () => {
  const query = `select * from t_section`;
  return sql.query(query);
};

export const updateStatusProjectModels = (id, status) => {
  const query = `UPDATE t_project SET status = '${status}' WHERE id = '${id}'`;
  return sql.query(query);
};

export const deleteProjectByProjectIdModels = (id) => {
  const query = `DELETE from t_project WHERE id = '${id}'`;
  return sql.query(query);
};

export const getProjectByProductIdModels = (productId) => {
  const query = `SELECT 
  t_project.id, 
  t_project.product_id,
  t_project.project_name,
  t_project.rank,
  t_project.manager_id,
  t_project.budget,
  t_project.saving_cost,
  t_project.start,
  t_project.finish,
  t_project.category,
  t_project.sub_category,
  t_project.description,
  t_project.user_id,
  t_product.product_name,
  t_product.section_id,
  t_section.section_name,
  t_project.status,
  t_project.create_date
  FROM t_project 
  JOIN t_product ON t_project.product_id = t_product.id
  JOIN t_section ON t_product.section_id = t_section.id
  WHERE t_project.product_id = '${productId}' ORDER BY t_project.create_date DESC`;
  return sql.query(query);
};

export const getProjectByDateRangeModels = (fromDate, toDate) => {
  const query = `SELECT 
  t_project.id, 
  t_project.product_id,
  t_project.project_name,
  t_project.rank,
  t_project.manager_id,
  t_project.budget,
  t_project.saving_cost,
  t_project.start,
  t_project.finish,
  t_project.category,
  t_project.sub_category,
  t_project.description,
  t_project.user_id,
  t_product.product_name,
  t_product.section_id,
  t_section.section_name,
  t_project.status,
  t_project.create_date
  FROM t_project 
  JOIN t_product ON t_project.product_id = t_product.id
  JOIN t_section ON t_product.section_id = t_section.id
  WHERE t_project.start >= '${fromDate}' AND t_project.finish <= '${toDate}' 
  ORDER BY t_project.create_date DESC`;
  return sql.query(query);
};

export const getProjectByProductIdAndDateRange = (
  fromDate,
  toDate,
  productId
) => {
  const query = `SELECT 
  t_project.id, 
  t_project.product_id,
  t_project.project_name,
  t_project.rank,
  t_project.manager_id,
  t_project.budget,
  t_project.saving_cost,
  t_project.start,
  t_project.finish,
  t_project.category,
  t_project.sub_category,
  t_project.description,
  t_project.user_id,
  t_product.product_name,
  t_product.section_id,
  t_section.section_name,
  t_project.status,
  t_project.create_date
  FROM t_project 
  JOIN t_product ON t_project.product_id = t_product.id
  JOIN t_section ON t_product.section_id = t_section.id
  WHERE (t_project.start >= '${fromDate}' AND t_project.finish <= '${toDate}') and t_project.product_id = '${productId}'
  ORDER BY t_project.create_date DESC`;
  return sql.query(query);
};

export const getProjectBySectionId = (id) => {
  const query = `SELECT 
  t_project.id, 
  t_project.product_id,
  t_project.project_name,
  t_project.rank,
  t_project.manager_id,
  t_project.budget,
  t_project.saving_cost,
  t_project.start,
  t_project.finish,
  t_project.category,
  t_project.sub_category,
  t_project.description,
  t_project.user_id,
  t_product.product_name,
  t_product.section_id,
  t_section.section_name,
  t_project.status,
  t_project.create_date,
  t_project.summary_progress
  FROM t_project 
  JOIN t_product ON t_project.product_id = t_product.id
  JOIN t_section ON t_product.section_id = t_section.id
  WHERE t_product.section_id = ${id} 
  ORDER BY t_project.create_date DESC
  `;

  return sql.query(query);
};

export const getProjectBySectionIdAndPage = (id, limit, offset) => {
  const query = `SELECT 
  t_project.id, 
  t_project.product_id,
  t_project.project_name,
  t_project.rank,
  t_project.manager_id,
  t_project.budget,
  t_project.saving_cost,
  t_project.start,
  t_project.finish,
  t_project.category,
  t_project.sub_category,
  t_project.description,
  t_project.user_id,
  t_product.product_name,
  t_product.section_id,
  t_section.section_name,
  t_project.status,
  t_project.create_date
  FROM t_project 
  JOIN t_product ON t_project.product_id = t_product.id
  JOIN t_section ON t_product.section_id = t_section.id
  WHERE t_product.section_id = ${id} 
  ORDER BY t_project.create_date desc OFFSET ${offset} ROWS
  FETCH NEXT ${limit} ROWS ONLY`;

  return sql.query(query);
};

export const getProjectByAllModels = (
  fromDate,
  toDate,
  productId,
  category
) => {
  const query = `SELECT 
  t_project.id, 
  t_project.product_id,
  t_project.project_name,
  t_project.rank,
  t_project.manager_id,
  t_project.budget,
  t_project.saving_cost,
  t_project.start,
  t_project.finish,
  t_project.category,
  t_project.sub_category,
  t_project.description,
  t_project.user_id,
  t_product.product_name,
  t_product.section_id,
  t_section.section_name,
  t_project.status,
  t_project.create_date
  FROM t_project 
  JOIN t_product ON t_project.product_id = t_product.id
  JOIN t_section ON t_product.section_id = t_section.id 
  WHERE (t_project.start >= '${fromDate}' AND t_project.finish <= '${toDate}') 
  and t_project.product_id = '${productId}' 
  and t_project.category = '${category}'
  ORDER BY t_project.create_date DESC
  `;

  return sql.query(query);
};

export const getProjectByAllWithoutDateRangeModels = (productId, category) => {
  const query = `SELECT 
  t_project.id, 
  t_project.product_id,
  t_project.project_name,
  t_project.rank,
  t_project.manager_id,
  t_project.budget,
  t_project.saving_cost,
  t_project.start,
  t_project.finish,
  t_project.category,
  t_project.sub_category,
  t_project.description,
  t_project.user_id,
  t_product.product_name,
  t_product.section_id,
  t_section.section_name,
  t_project.status,
  t_project.create_date
  FROM t_project 
  JOIN t_product ON t_project.product_id = t_product.id
  JOIN t_section ON t_product.section_id = t_section.id 
  WHERE t_project.product_id = '${productId}' 
  and t_project.category = '${category}'
  ORDER BY t_project.create_date DESC
  `;

  return sql.query(query);
};

export const updateSummaryProgressModels = (data) => {
  const query = `UPDATE t_project SET summary_progress = '${data.summary_progress}' where id = '${data.id}'`;
  return sql.query(query);
};
