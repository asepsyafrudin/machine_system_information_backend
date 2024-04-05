import {
  countCapabilityModels,
  createCapabilityModels,
  deleteCapabilityModels,
  getAllCapabilityModels,
  getCapabilityByIdModels,
  getCapabilityByProjectIdModels,
  getCapabilityByUserIdModels,
  searchCapabilityModels,
  updateCapabilityModels,
} from "../models/capability.js";
import {
  createDataCapabilityModels,
  deleteDataCapabilityByCapabilityIdModels,
  getDataCapabilityByCapabilityIdModels,
} from "../models/capabilityData.js";

import { v4 as uuidv4 } from "uuid";

export const createCapability = async (req, res) => {
  try {
    const id = uuidv4();
    const status = req.body.status;

    await createCapabilityModels(req.body, id);
    if (status === "single") {
      const capabilityData = req.body.data;
      if (capabilityData.length > 0) {
        const statusData = "current";
        for (let index = 0; index < capabilityData.length; index++) {
          await createCapabilityModels(
            capabilityData[index].data,
            id,
            statusData
          );
        }
      }
    } else if (status === "compare") {
      const capabilityData1 = req.body.data1;
      const capabilityData2 = req.body.data2;
      const statusData1 = "current";
      const statusData2 = "after";
      for (let index = 0; index < capabilityData1.length; index++) {
        await createDataCapabilityModels(
          capabilityData1[index].data,
          id,
          statusData1
        );
      }

      for (let index = 0; index < capabilityData2.length; index++) {
        await createDataCapabilityModels(
          capabilityData2[index].data,
          id,
          statusData2
        );
      }
    }
    res.status(200).json({
      msg: "capability data berhasil di submit",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "capability data gagal di submit",
      errMsg: error,
    });
  }
};

export const updateCapability = async (req, res) => {
  try {
    const status = req.body.status;
    const id = req.body.id;
    await updateCapabilityModels(req.body);
    const result = (await getDataCapabilityByCapabilityIdModels(req.body.id))
      .recordset;
    if (result.length > 0) {
      await deleteDataCapabilityByCapabilityIdModels(req.body.id);
    }

    if (status === "single") {
      const capabilityData = req.body.data;
      if (capabilityData.length > 0) {
        const statusData = "current";
        for (let index = 0; index < capabilityData.length; index++) {
          await createDataCapabilityModels(
            capabilityData[index].data,
            id,
            statusData
          );
        }
      }
    } else if (status === "compare") {
      const capabilityData1 = req.body.data1;
      const capabilityData2 = req.body.data2;
      const statusData1 = "current";
      const statusData2 = "after";
      for (let index = 0; index < capabilityData1.length; index++) {
        await createDataCapabilityModels(
          capabilityData1[index].data,
          id,
          statusData1
        );
      }
      for (let index = 0; index < capabilityData2.length; index++) {
        await createDataCapabilityModels(
          capabilityData2[index].data,
          id,
          statusData2
        );
      }
    }
    res.status(200).json({
      msg: "data berhasil di update",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "capability data gagal di update",
      errMsg: error,
    });
  }
};

export const getCapabilityByUserId = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const page = req.params.page;
    const dataPerPage = 10;
    const offset = (page - 1) * dataPerPage;
    const result = (
      await getCapabilityByUserIdModels(dataPerPage, offset, userId)
    ).recordset;

    let data = [];

    if (result.length > 0) {
      for (let index = 0; index < result.length; index++) {
        const data_capability = (
          await getDataCapabilityByCapabilityIdModels(result[index].id)
        ).recordset;
        data.push({
          result: result[index],
          data: data_capability,
        });
      }
    }
    res.status(200).json({
      msg: "get data berhasil",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      msg: "get data gagal",
      errMsg: error,
    });
  }
};

export const getAllCapability = async (req, res) => {
  try {
    const page = req.params.page;
    const dataPerPage = 20;
    const offset = (page - 1) * dataPerPage;
    const result = (await getAllCapabilityModels(dataPerPage, offset))
      .recordset;
    const totalData = (await countCapabilityModels()).recordset;

    const totalPageData = Math.ceil(totalData[0].count / dataPerPage);
    let data = [];

    if (result.length > 0) {
      for (let index = 0; index < result.length; index++) {
        if (result[index].status === "compare") {
          const data_capability = (
            await getDataCapabilityByCapabilityIdModels(result[index].id)
          ).recordset;
          const data1 = data_capability.filter(
            (value) => value.status === "current"
          );
          const data2 = data_capability.filter(
            (value) => value.status === "after"
          );
          data.push({
            ...result[index],
            data1: data1,
            data2: data2,
          });
        } else {
          const data_capability = (
            await getDataCapabilityByCapabilityIdModels(result[index].id)
          ).recordset;
          data.push({
            ...result[index],
            data1: data_capability,
          });
        }
      }
    }
    res.status(200).json({
      msg: "get data berhasil",
      dataPerPage: dataPerPage,
      numberStart: (page - 1) * dataPerPage + 1,
      totalPageData: totalPageData,
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      msg: "get data gagal",
      errMsg: error,
    });
  }
};

export const getCapabilityById = async (req, res) => {
  try {
    const result = (await getCapabilityByIdModels(req.params.id)).recordset;
    let data = [];
    if (result.length > 0) {
      for (let index = 0; index < result.length; index++) {
        if (result[index].status === "compare") {
          const data_capability = (
            await getDataCapabilityByCapabilityIdModels(result[index].id)
          ).recordset;
          const data1 = data_capability.filter(
            (value) => value.status === "current"
          );
          const data2 = data_capability.filter(
            (value) => value.status === "after"
          );
          data.push({
            ...result[index],
            data1: data1,
            data2: data2,
          });
        } else {
          const data_capability = (
            await getDataCapabilityByCapabilityIdModels(result[index].id)
          ).recordset;
          data.push({
            ...result[index],
            data1: data_capability,
          });
        }
      }
    }

    res.status(200).json({
      msg: "get data berhasil",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      msg: "get data gagal",
      errMsg: error,
    });
  }
};

export const deleteCapability = async (req, res) => {
  try {
    await deleteCapabilityModels(req.params.id);
    res.status(200).json({
      msg: "data berhasil di delete",
      data: req.params.id,
    });
  } catch (error) {
    res.status(400).json({
      msg: "capability data gagal di delete",
      errMsg: error,
    });
  }
};

export const searchCapability = async (req, res) => {
  try {
    const search = req.params.searchValue;
    const page = req.params.page;
    const dataPerPage = 20;
    const offset = (page - 1) * dataPerPage;

    const result = (await searchCapabilityModels(search, offset, dataPerPage))
      .recordset;
    const totalData = result.length;

    const totalPageData = Math.ceil(totalData / dataPerPage);
    let data = [];

    if (result.length > 0) {
      for (let index = 0; index < result.length; index++) {
        const data_capability = (
          await getDataCapabilityByCapabilityIdModels(result[index].id)
        ).recordset;
        data.push({
          ...result[index],
          data: data_capability,
        });
      }
    }
    res.status(200).json({
      msg: "get data berhasil",
      dataPerPage: dataPerPage,
      numberStart: (page - 1) * dataPerPage + 1,
      totalPageData: totalPageData,
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      msg: "get data gagal",
      errMsg: error,
    });
  }
};

export const getCapabilityByProjectId = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const result = (await getCapabilityByProjectIdModels(projectId)).recordset;
    res.status(200).json({
      msg: "Get Data Berhasil",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "get data gagal",
      errMsg: error,
    });
  }
};
