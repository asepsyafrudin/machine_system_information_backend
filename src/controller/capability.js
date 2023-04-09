import {
  createCapabilityModels,
  deleteCapabilityModels,
  getAllCapabilityModels,
  getCapabilityByIdModels,
  getCapabilityByUserIdModels,
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
        await createDataCapabilityModels(capabilityData[index], id);
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
    const [result] = await getDataCapabilityByCapabilityIdModels(
      req.body.capability_id
    );
    if (result.length > 0) {
      await deleteDataCapabilityByCapabilityIdModels(req.body.capability_id);
      if (data.length > 0) {
        for (let index = 0; index < data.length; index++) {
          await createDataCapabilityModels(data[index], req.body.capability_id);
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

    res.status(200).json({
      msg: "get data berhasil",
      data: result,
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
    const dataPerPage = 10;
    const offset = (page - 1) * dataPerPage;
    const [result] = await getAllCapabilityModels(dataPerPage, offset);

    res.status(200).json({
      msg: "get data berhasil",
      data: result,
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
    res.status(200).json({
      msg: "get data berhasil",
      data: result,
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
