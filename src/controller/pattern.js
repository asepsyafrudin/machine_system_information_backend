import {
  createPatternModels,
  getAllPatternModels,
  getPatternByPatternIdModels,
  updatePatternModels,
  deletePatternByPatternIdModels,
} from "../models/pattern.js";
import { v4 as uuidv4 } from "uuid";
import { createActivityPatternModels } from "../models/pattern_activity.js";
import { getUserByUserIdModels } from "../models/user.js";

export const createPattern = async (req, res) => {
  try {
    const totalData = req.body;
    const generatedId = uuidv4();
    totalData["id"] = generatedId;
    const activity = req.body.activity;
    const user = req.body.user;
    totalData["create_by"] = user;
    for (let index = 0; index < activity.length; index++) {
      const rangeTime =
        new Date(activity[index].end).getTime() -
        new Date(activity[index].start).getTime();
      const totalRangeTime = rangeTime / (1000 * 60 * 60 * 24);
      activity[index]["range_activity"] = totalRangeTime;

      const rangeFromStartActivity =
        new Date(activity[index].start).getTime() -
        new Date(activity[0].start).getTime();
      const totalRangeFromStart =
        rangeFromStartActivity / (1000 * 60 * 60 * 24);
      activity[index]["range_from_start"] = totalRangeFromStart;

      activity[index]["id_pattern"] = generatedId;
    }

    console.log(totalData);
    await createPatternModels(totalData);

    for (let index = 0; index < activity.length; index++) {
      const currentId = activity[index].id;
      const indexforChangingId = activity.findIndex(
        (value) => value.dependencies[0] === currentId
      );
      let newId = `${activity[index].name}-${uuidv4()}`;

      if (indexforChangingId !== -1) {
        activity[indexforChangingId].dependencies[0] = newId;
      }

      activity[index]["id_activity"] = newId;
    }

    for (let index2 = 0; index2 < activity.length; index2++) {
      await createActivityPatternModels(activity[index2]);
    }

    res.status(200).json({
      msg: "create pattern berhasil di submit",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "create pattern gagal",
      errMsg: error,
    });
  }
};

export const updatePattern = async (req, res) => {
  try {
    await updatePatternModels(req.body);
    res.status(200).json({
      msg: "update pattern berhasil di submit",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "update pattern gagal",
      errMsg: error,
    });
  }
};

export const getAllPattern = async (req, res) => {
  try {
    const userId = req.body.userId;

    const result = (await getAllPatternModels(userId)).recordset;
    res.status(200).json({
      msg: "data berhasil di get",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "data gagal di get",
      data: error,
    });
  }
};

export const getPatternById = async (req, res) => {
  try {
    const result = (await getPatternByPatternIdModels(req.params.id)).recordset;
    res.status(200).json({
      msg: "data berhasil di get",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "data gagal di get",
      data: error,
    });
  }
};

export const deletePattern = async (req, res) => {
  try {
    (await deletePatternByPatternIdModels(req.params.id)).recordset;
    res.status(200).json({
      msg: " delete pattern berhasil",
      data: req.params.id,
    });
  } catch (error) {
    res.status(400).json({
      msg: "data gagal dihapus",
      data: error,
    });
  }
};
