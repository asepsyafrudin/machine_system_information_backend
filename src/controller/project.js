import moment from "moment/moment.js";
import {
  avgActivityByProjectIdModels,
  getActivityByProjectIdModels,
} from "../models/activity.js";
import {
  createMembers,
  deleteMembers,
  getMemberByProjectId,
} from "../models/members.js";
import {
  countGetAllProjectModels,
  createProjectModels,
  deleteProjectByProjectIdModels,
  getAllProjectModels,
  getProjectByAllModels,
  getProjectByAllWithoutDateRangeModels,
  getProjectByDateRangeModels,
  getProjectByIdModels,
  getProjectByProductIdAndDateRange,
  getProjectByProductIdModels,
  getProjectBySectionId,
  getProjectBySectionIdAndPage,
  updateProjectModels,
  updateStatusProjectModels,
  updateProjectByDateModels,
  getAllProjectTableModels,
  getAllProductTableModels,
  getALlSectionTableModels,
} from "../models/project.js";

export const createProject = async (req, res) => {
  try {
    await deleteMembers(req.body.id);
    await createProjectModels(req.body);
    const members = req.body.member;
    if (members.length > 0) {
      for (let index = 0; index < members.length; index++) {
        (await createMembers(req.body.id, members[index])).recordset;
      }
    }
    res.status(200).json({
      msg: "create project berhasil di submit",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "create project gagal",
      errMsg: error,
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    // await deleteMembers(req.body.id);
    await updateProjectModels(req.body);
    const members = req.body.member;
    const getMemberByProject = (await getMemberByProjectId(req.body.id))
      .recordset;

    if (members.length > 0) {
      for (let index = 0; index < members.length; index++) {
        const findMember = getMemberByProject.find(
          (value) => value.user_id === parseInt(members[index])
        );
        if (!findMember) {
          (await createMembers(req.body.id, members[index])).recordset;
        }
      }
    }
    res.status(200).json({
      msg: "update project berhasil di submit",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "update project gagal",
      errMsg: error,
    });
  }
};

export const updateProjectByDate = async (req, res) => {
  try {
    await updateProjectByDateModels(req.body.id, req.body.start, req.body.end);
    res.status(200).json({
      msg: "update project berhasil di submit",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "update project gagal",
      errMsg: error,
    });
  }
};

const statusFunction = (
  arrayDataActivity,
  startDate,
  SOPDate,
  progress,
  status
) => {
  let totalActivityDelay = 0;
  let currentDate = new Date();
  let start = new Date(startDate);
  currentDate.setDate(currentDate.getDate() - 1);

  if (status !== "cancel") {
    if (arrayDataActivity.length > 0) {
      if (progress === 100) {
        return "Finish";
      } else if (start - currentDate > 0) {
        return "Not Yet Started";
      } else {
        for (let index = 0; index < arrayDataActivity.length; index++) {
          let endDateActivity = new Date(
            moment(arrayDataActivity[index].finish)
          );

          if (
            currentDate - endDateActivity > 0 &&
            parseInt(arrayDataActivity[index].progress) < 100
          ) {
            totalActivityDelay += 1;
          }
        }
        if (totalActivityDelay === 0) {
          return "On Progress";
        } else {
          return `${totalActivityDelay} Activity Delay`;
        }
      }
    } else {
      return "Waiting Detail Activity";
    }
  } else {
    return "cancel";
  }
};

export const getDataResult = async (result) => {
  let resultSubmit = [];
  if (result.length > 0) {
    for (let index = 0; index < result.length; index++) {
      let member = (await getMemberByProjectId(result[index].id)).recordset;
      // let progress = (await avgActivityByProjectIdModels(result[index].id))
      //   .recordset;
      let activityData = (await getActivityByProjectIdModels(result[index].id))
        .recordset;

      let averageProgess = 0;
      if (activityData.length > 0) {
        for (let index = 0; index < activityData.length; index++) {
          averageProgess += parseInt(activityData[index].progress);
        }
        averageProgess = averageProgess / activityData.length;
      }

      let data = {
        ...result[index],
        // id: result[index].id,
        // product_id: result[index].product_id,
        // product_name: result[index].product_name,
        // rank: result[index].rank,
        // project_name: result[index].project_name,
        // manager_id: result[index].manager_id,
        // budget: result[index].budget,
        // saving_cost: result[index].saving_cost,
        // start: result[index].start,
        // finish: result[index].finish,
        // create_date: result[index].create_date,

        // user_id: result[index].user_id,
        // category: result[index].category,
        // sub_category: result[index].sub_category,
        // description: result[index].description,
        // section_id: result[index].section_id,
        // section_name: result[index].section_name,
        activityData: activityData,
        member: member,
        status: statusFunction(
          activityData,
          result[index].start,
          result[index].finish,
          averageProgess,
          result[index].status
        ),
        progress: averageProgess,
      };
      resultSubmit.push(data);
    }
  }
  return resultSubmit;
};

export const getAllProject = async (req, res) => {
  try {
    const tableProject = (await getAllProjectTableModels()).recordset;
    const tableProduct = (await getAllProductTableModels()).recordset;
    const tableSection = (await getALlSectionTableModels()).recordset;

    if (tableProject.length > 0) {
      for (let index = 0; index < tableProject.length; index++) {
        const dataProduct = tableProduct.find(
          (value) => value.id === tableProject[index].product_id
        );
        if (dataProduct) {
          tableProject[index] = {
            ...tableProject[index],
            product_name: dataProduct.product_name,
            section_id: dataProduct.section_id,
          };
        }
      }

      for (let index = 0; index < tableProject.length; index++) {
        const dataSection = tableSection.find(
          (value) => value.id === tableProject[index].section_id
        );
        if (dataSection) {
          tableProject[index] = {
            ...tableProject[index],
            section_name: dataSection.section_name,
          };
        }
      }
    }

    const result = tableProject;

    const resultSubmit = await getDataResult(result);
    res.status(200).json({
      msg: "get data berhasil",
      data: resultSubmit,
    });
  } catch (error) {
    res.status(400).json({
      msg: "get project gagal",
      errMsg: error,
    });
  }
};

export const getAllProjectByPage = async (req, res) => {
  try {
    const page = req.params.page;
    const dataPerPage = 10;
    const offset = (page - 1) * dataPerPage;
    const result = (await getAllProjectModels(dataPerPage, offset)).recordset;
    const resultSubmit = await getDataResult(result);
    const totalData = (await countGetAllProjectModels()).recordset;
    const totalPageData = Math.ceil(totalData.length / dataPerPage);
    res.status(200).json({
      msg: "get project berhasil",
      dataPerPage: dataPerPage,
      numberStart: (page - 1) * dataPerPage + 1,
      totalPageData: totalPageData,
      data: resultSubmit,
    });
  } catch (error) {
    res.status(400).json({
      msg: "get project gagal",
      errMsg: error,
    });
  }
};

export const getProjectByPageAndUser = async (req, res) => {
  try {
    const user = req.params.user;
    const page = req.params.page;
    const dataPerPage = 10;
    const result = (await countGetAllProjectModels()).recordset;
    const resultSubmit = await getDataResult(result);
    const filterByMember = [];
    if (resultSubmit.length > 0) {
      for (let index = 0; index < resultSubmit.length; index++) {
        for (
          let index2 = 0;
          index2 < resultSubmit[index].member.length;
          index2++
        ) {
          if (resultSubmit[index].member[index2].user_id === parseInt(user)) {
            filterByMember.push(resultSubmit[index]);
          }
        }
      }
    }

    let listData = [];
    const totalPageData = Math.ceil(filterByMember.length / dataPerPage);
    for (
      let index = (page - 1) * dataPerPage;
      index < page * dataPerPage && index < filterByMember.length;
      index++
    ) {
      listData.push(filterByMember[index]);
    }

    res.status(200).json({
      msg: "get project berhasil",
      dataPerage: dataPerPage,
      numberStart: (page - 1) * dataPerPage + 1,
      totalPageData: totalPageData,
      data: listData,
    });
  } catch (error) {
    res.status(400).json({
      msg: "get project gagal",
      errMsg: error,
    });
  }
};

export const getProjectByUser = async (req, res) => {
  try {
    const user = req.params.userId;
    const tableProject = (await getAllProjectTableModels()).recordset;
    const tableProduct = (await getAllProductTableModels()).recordset;
    const tableSection = (await getALlSectionTableModels()).recordset;

    if (tableProject.length > 0) {
      for (let index = 0; index < tableProject.length; index++) {
        const dataProduct = tableProduct.find(
          (value) => value.id === tableProject[index].product_id
        );
        if (dataProduct) {
          tableProject[index] = {
            ...tableProject[index],
            product_name: dataProduct.product_name,
            section_id: dataProduct.section_id,
          };
        }
      }

      for (let index = 0; index < tableProject.length; index++) {
        const dataSection = tableSection.find(
          (value) => value.id === tableProject[index].section_id
        );
        if (dataSection) {
          tableProject[index] = {
            ...tableProject[index],
            section_name: dataSection.section_name,
          };
        }
      }
    }

    const result = tableProject;
    const resultSubmit = await getDataResult(result);
    let filterByMember = [];

    if (resultSubmit.length > 0) {
      for (let index = 0; index < resultSubmit.length; index++) {
        for (
          let index2 = 0;
          index2 < resultSubmit[index].member.length;
          index2++
        ) {
          if (resultSubmit[index].member[index2].user_id === parseInt(user)) {
            filterByMember.push(resultSubmit[index]);
          }
        }
      }
    }

    res.status(200).json({
      msg: "get project berhasil",
      data: filterByMember,
    });
  } catch (error) {
    res.status(400).json({
      msg: "get project gagal",
      errMsg: error.message,
    });
  }
};

export const updateStatusProject = async (req, res) => {
  try {
    await updateStatusProjectModels(req.body.id, req.body.status);
    res.status(200).json({
      msg: "update project berhasil di submit",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "update project gagal",
      errMsg: error,
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const result = (await getProjectByIdModels(req.params.id)).recordset;
    const resultSubmit = await getDataResult(result);
    res.status(200).json({
      msg: " get project berhasil ",
      data: resultSubmit,
    });
  } catch (error) {
    res.status(400).json({
      msg: "get project gagal",
      errMsg: error,
    });
  }
};

export const deleteProjectByProjectId = async (req, res) => {
  try {
    await deleteProjectByProjectIdModels(req.params.id);
    res.status(200).json({
      msg: " delete project berhasil ",
      data: req.params.id,
    });
  } catch (error) {
    res.status(400).json({
      msg: "get project gagal",
      errMsg: error,
    });
  }
};

export const searchProject = async (req, res) => {
  try {
    const sectionId = req.body.section_id;
    const productId = req.body.product_id;
    const fromDate = req.body.from_date;
    const toDate = req.body.to_date;
    const category = req.body.category;

    if (sectionId) {
      if (productId) {
        if (category) {
          if (fromDate && toDate) {
            const result = (
              await getProjectByAllModels(fromDate, toDate, productId, category)
            ).recordset;
            const resultSubmit = await getDataResult(result);
            res.status(200).json({
              msg: " get project berhasil ",
              data: resultSubmit,
            });
          } else {
            const result = (
              await getProjectByAllWithoutDateRangeModels(productId, category)
            ).recordset;
            const resultSubmit = await getDataResult(result);
            res.status(200).json({
              msg: " get project berhasil ",
              data: resultSubmit,
            });
          }
          // make function for sectionId, productId, and category only
        } else if (fromDate && toDate) {
          const result = (
            await getProjectByProductIdAndDateRange(fromDate, toDate, productId)
          ).recordset;
          const resultSubmit = await getDataResult(result);
          res.status(200).json({
            msg: " get project berhasil ",
            data: resultSubmit,
          });
        } else {
          const result = (await getProjectByProductIdModels(productId))
            .recordset;
          const resultSubmit = await getDataResult(result);
          res.status(200).json({
            msg: " get project berhasil ",
            data: resultSubmit,
          });
        }
      } else {
        const result = (await getProjectBySectionId(sectionId)).recordset;
        const resultSubmit = await getDataResult(result);
        res.status(200).json({
          msg: " get project berhasil ",
          data: resultSubmit,
        });
      }
    } else if (fromDate && toDate) {
      const result = (await getProjectByDateRangeModels(fromDate, toDate))
        .recordset;
      const resultSubmit = await getDataResult(result);
      res.status(200).json({
        msg: "get data berhasil",
        data: resultSubmit,
      });
    } else {
      const result = (await countGetAllProjectModels()).recordset;
      const resultSubmit = await getDataResult(result);
      res.status(200).json({
        msg: "get data berhasil",
        data: resultSubmit,
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "get project gagal",
      errMsg: error,
    });
  }
};

export const getProjectBySectioIdAndPageController = async (req, res) => {
  try {
    const sectionId = req.params.sectionId;
    const page = req.params.page;
    const dataPerPage = 10;
    const offset = (page - 1) * dataPerPage;
    // const [result] = await getProjectBySectionIdAndPage(
    //   sectionId,
    //   dataPerPage,
    //   offset
    // );
    const totalData = (await getProjectBySectionId(sectionId)).recordset;
    const totalPageData = Math.ceil(totalData.length / dataPerPage);
    const resultSubmit = await getDataResult(totalData);
    res.status(200).json({
      msg: "todo berhasil di get",
      data: resultSubmit,
      dataPerPage: dataPerPage,
      numberStart: (page - 1) * dataPerPage + 1,
      totalPageData: totalPageData,
    });
  } catch (error) {
    res.status(400).json({
      msg: "todo gagal di get",
      errMsg: error,
    });
  }
};

export const getAllProjectByFilterAndPage = async (req, res) => {
  try {
    const { page, filterBy, detailFilter } = req.body;
    const dataPerPage = 10;
    let listData = [];
    const totalProject = (await countGetAllProjectModels()).recordset;
    if (totalProject.length > 0) {
      if (filterBy === "category") {
        const filterData = totalProject.filter(
          (value) => value.category === detailFilter
        );

        for (
          let index = (page - 1) * dataPerPage;
          index < page * dataPerPage && index < filterData.length;
          index++
        ) {
          listData.push(filterData[index]);
        }
      } else if (filterBy === "rank") {
        const filterData = totalProject.filter(
          (value) => value.rank === detailFilter
        );

        for (
          let index = (page - 1) * dataPerPage;
          index < page * dataPerPage && index < filterData.length;
          index++
        ) {
          listData.push(filterData[index]);
        }
      } else if (filterBy === "pic") {
        const filterData = totalProject.filter(
          (value) => value.manager_id === parseInt(detailFilter)
        );
        for (
          let index = (page - 1) * dataPerPage;
          index < page * dataPerPage && index < filterData.length;
          index++
        ) {
          listData.push(filterData[index]);
        }
      } else {
        if (detailFilter === "Delay") {
          let notCryteria = [
            "Not Yet Started",
            "On Progress",
            "Finish",
            "Waiting Detail Activity",
            "cancel",
          ];

          let result = [];
          for (let index = 0; index < totalProject.length; index++) {
            let checkData = notCryteria.find(
              (value) => value === totalProject[index].status
            );
            if (!checkData) {
              result.push(totalProject[index]);
            }
          }

          if (result.length > 0) {
            for (
              let index = (page - 1) * dataPerPage;
              index < page * dataPerPage && index < result.length;
              index++
            ) {
              listData.push(result[index]);
            }
          }
        } else {
          const filterData = totalProject.filter(
            (value) => value.status === detailFilter
          );
          for (
            let index = (page - 1) * dataPerPage;
            index < page * dataPerPage && index < filterData.length;
            index++
          ) {
            listData.push(filterData[index]);
          }
        }
      }
    }

    res.status(200).json({
      msg: "get data success",
      data: listData,
      dataPerPage: dataPerPage,
      numberStart: (page - 1) * dataPerPage + 1,
      totalPageData: totalPageData,
    });
  } catch (error) {
    res.status(400).json({
      msg: "get data failed",
      errMsg: error,
    });
  }
};
