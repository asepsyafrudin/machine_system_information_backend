import {
  createMembers,
  deleteMembers,
  getMemberByProjectId,
} from "../models/members.js";
import {
  countGetAllProjectModels,
  createProjectModels,
  getAllProjectModels,
  getProjectByIdModels,
  updateProjectModels,
  updateStatusProjectModels,
} from "../models/project.js";

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

export const getAllProject = async (req, res) => {
  try {
    const page = req.params.page;
    const dataPerPage = 10;
    const offset = (page - 1) * dataPerPage;
    const resultSubmit = [];

    const [result] = await getAllProjectModels(dataPerPage, offset);
    if (result.length > 0) {
      for (let index = 0; index < result.length; index++) {
        let [member] = await getMemberByProjectId(result[index].id);
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
          status: result[index].status,
        };
        resultSubmit.push(data);
      }
    }

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
    const resultSubmit = [];
    const [result] = await getProjectByIdModels(req.params.id);
    if (result.length > 0) {
      for (let index = 0; index < result.length; index++) {
        let [member] = await getMemberByProjectId(result[index].id);
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
          status: result[index].status,
        };
        resultSubmit.push(data);
      }
    }
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
