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
  getProjectByDateRangeModels,
  getProjectByIdModels,
  getProjectByProductIdAndDateRange,
  getProjectByProductIdModels,
  updateProjectModels,
  updateStatusProjectModels,
} from "../models/project.js";
import { getActivityByProjectId } from "./activity.js";

export const createProject = async (req, res) => {
  try {
    await deleteMembers(req.body.id);
    await createProjectModels(req.body);
    const members = req.body.member;
    if (members.length > 0) {
      for (let index = 0; index < members.length; index++) {
        await createMembers(req.body.id, members[index]);
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
    await deleteMembers(req.body.id);
    await updateProjectModels(req.body);
    const members = req.body.member;
    if (members.length > 0) {
      for (let index = 0; index < members.length; index++) {
        await createMembers(req.body.id, members[index]);
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

const statusFunction = (arrayDataActivity, startDate, SOPDate, progress) => {
  let totalActivityDelay = 0;
  let currentDate = new Date();
  let start = new Date(startDate);
  currentDate.setDate(currentDate.getDate() - 1);

  if (arrayDataActivity.length > 0) {
    if (progress) {
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
    return "Waiting Detail Activity";
  }

  // if (progress) {
  //   if (progress === 100) {
  //     return "Finish";
  //   } else {
  //     let currentDate = new Date();
  //     currentDate.setDate(currentDate.getDate() - 1);
  //     let start = new Date(startDate);
  //     let sop = new Date(SOPDate);
  //     if (startDate - currentDate > 0) {
  //       return "Not Yet Started";
  //     } else if (sop - currentDate < 0) {
  //       return "Delay";
  //     } else if (currentDate - start > 0) {
  //       return "On Progress";
  //     }
  //   }
  // } else {
  //   return "Waiting Detail Activity";
  // }
};

const getDataResult = async (result) => {
  let resultSubmit = [];
  if (result.length > 0) {
    for (let index = 0; index < result.length; index++) {
      let [member] = await getMemberByProjectId(result[index].id);
      let [progress] = await avgActivityByProjectIdModels(result[index].id);
      let [activityData] = await getActivityByProjectIdModels(result[index].id);
      let data = {
        id: result[index].id,
        product_id: result[index].product_id,
        project_name: result[index].project_name,
        manager_id: result[index].manager_id,
        budget: result[index].budget,
        saving_cost: result[index].saving_cost,
        start: result[index].start,
        finish: result[index].finish,
        create_date: result[index].create_date,
        member: member,
        user_id: result[index].user_id,
        status: statusFunction(
          activityData,
          result[index].start,
          result[index].finish,
          progress[0].progress
        ),
        progress: progress[0].progress,
      };
      resultSubmit.push(data);
    }
  }
  return resultSubmit;
};

export const getAllProject = async (req, res) => {
  try {
    const [result] = await countGetAllProjectModels();
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
    const [result] = await getAllProjectModels(dataPerPage, offset);
    const resultSubmit = await getDataResult(result);
    const [totalData] = await countGetAllProjectModels();
    const totalPageData = Math.ceil(totalData.length / dataPerPage);
    res.status(200).json({
      msg: "get project berhasil",
      dataPerage: dataPerPage,
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
    const [result] = await countGetAllProjectModels();
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
    const [result] = await getProjectByIdModels(req.params.id);
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
    const productId = req.body.product_id;
    const fromDate = req.body.from_date;
    const toDate = req.body.to_date;
    if (productId) {
      if (fromDate && toDate) {
        const [result] = await getProjectByProductIdAndDateRange(
          fromDate,
          toDate,
          productId
        );
        const resultSubmit = await getDataResult(result);
        res.status(200).json({
          msg: " get project berhasil ",
          data: resultSubmit,
        });
      } else {
        const [result] = await getProjectByProductIdModels(productId);
        const resultSubmit = await getDataResult(result);
        res.status(200).json({
          msg: " get project berhasil ",
          data: resultSubmit,
        });
      }
    } else {
      if (fromDate && toDate) {
        const [result] = await getProjectByDateRangeModels(fromDate, toDate);
        const resultSubmit = await getDataResult(result);
        res.status(200).json({
          msg: "get data berhasil",
          data: resultSubmit,
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      msg: "get project gagal",
      errMsg: error,
    });
  }
};
