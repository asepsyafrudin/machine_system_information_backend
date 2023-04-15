import {
  countCapabilityModels,
  createCapabilityModels,
  deleteCapabilityModels,
  getAllCapabilityModels,
  getCapabilityByIdModels,
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
    const capabilityData = req.body.data;
    await createCapabilityModels(req.body, id);
    if (capabilityData.length > 0) {
      for (let index = 0; index < capabilityData.length; index++) {
        await createDataCapabilityModels(capabilityData[index].data, id);
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
    const data = req.body.data;
    await updateCapabilityModels(req.body);
    const [result] = await getDataCapabilityByCapabilityIdModels(req.body.id);
    if (result.length > 0) {
      await deleteDataCapabilityByCapabilityIdModels(req.body.id);
      if (data.length > 0) {
        for (let index = 0; index < data.length; index++) {
          await createDataCapabilityModels(data[index].data, req.body.id);
        }
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
    const [result] = await getCapabilityByUserIdModels(
      dataPerPage,
      offset,
      userId
    );

    let data = [];

    if (result.length > 0) {
      for (let index = 0; index < result.length; index++) {
        const [data_capability] = await getDataCapabilityByCapabilityIdModels(
          result[index].id
        );
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
    const [result] = await getAllCapabilityModels(dataPerPage, offset);
    const [totalData] = await countCapabilityModels();

    const totalPageData = Math.ceil(totalData[0].count / dataPerPage);
    let data = [];

    if (result.length > 0) {
      for (let index = 0; index < result.length; index++) {
        const [data_capability] = await getDataCapabilityByCapabilityIdModels(
          result[index].id
        );
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

export const getCapabilityById = async (req, res) => {
  try {
    const [result] = await getCapabilityByIdModels(req.params.id);
    let data = [];
    if (result.length > 0) {
      const [data_capability] = await getDataCapabilityByCapabilityIdModels(
        result[0].id
      );
      data.push({
        ...result[0],
        data: data_capability,
      });
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

    const [result] = await searchCapabilityModels(search, offset, dataPerPage);
    const totalData = result.length;

    const totalPageData = Math.ceil(totalData / dataPerPage);
    let data = [];

    if (result.length > 0) {
      for (let index = 0; index < result.length; index++) {
        const [data_capability] = await getDataCapabilityByCapabilityIdModels(
          result[index].id
        );
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
