import { log } from "../config/logConfig.js";
import { getDependenciesByActivityIdModels } from "../models/dependencies.js";
import {
  createActivityPatternModels,
  getAllActivityPatternModels,
  getActivityPatternByIdModels,
  getAllActivityPatternByPatternIdModels,
  updateActivityPatternModels,
  deleteActivityPatternModels,
} from "../models/pattern_activity.js";
import { getProjectByIdModels } from "../models/project.js";
import { v4 as uuidv4 } from "uuid";

export const createPatternActivity = async (req, res) => {
  try {
    const dataSave = req.body;
    if (dataSave.length > 0) {
      for (let index = 0; index < dataSave.length; index++) {
        const checkData = (
          await getActivityPatternByIdModels(dataSave[index].id)
        ).recordset;

        if (checkData.length > 0) {
          await updateActivityPatternModels(dataSave[index]);
        } else {
          await createActivityPatternModels(dataSave[index]);
        }
      }
      const newDataAfterCreate = (
        await getAllActivityPatternByPatternIdModels(dataSave[0].pattern)
      ).recordset;
      if (newDataAfterCreate.length > 0) {
        for (let index = 0; index < newDataAfterCreate.length; index++) {
          const checkData = dataSave.find(
            (value) => value.id === newDataAfterCreate[index].id
          );
          if (!checkData) {
            await deleteActivityPatternModels(newDataAfterCreate[index].id);
          }
        }
      }
    }
    res.status(200).json({
      msg: "activity pattern berhasil di post",
      data: req.body,
    });
  } catch (error) {
    log.error(error);

    res.status(400).json({
      msg: "activity pattern gagal di create",
      errMsg: error,
    });
  }
};

export const getActivityPatternByPatternId = async (req, res) => {
  try {
    let activityResult = [];
    const idProject = req.params.idProject;
    const idPattern = req.params.id;
    const result = (await getAllActivityPatternByPatternIdModels(idPattern))
      .recordset;
    const dataProject = (await getProjectByIdModels(idProject)).recordset;

    if (result.length > 0 && dataProject.length > 0) {
      const startProject = new Date(dataProject[0].start);

      for (let index = 0; index < result.length; index++) {
        const rangeDate = result[index].range_from_start;
        const rangeActivity = result[index].range_activity;

        const startActivity =
          startProject.getTime() + 1000 * 60 * 60 * 24 * rangeDate;

        const finishDate =
          new Date(startActivity).getTime() +
          1000 * 60 * 60 * 24 * rangeActivity;
        activityResult.push({
          id: result[index].id_activity,
          start: new Date(startActivity),
          end: new Date(finishDate),
          name: result[index].name,
          progress: "",
          dependencies: result[index].dependencies,
          type: result[index].type,
          project: "",
          styles: "",
          remark: "",
          linkToProject: "",
          pic: "",
        });
      }
    }
    res.status(200).json({
      msg: "get activity pattern berhasil",
      data: activityResult,
    });
  } catch (error) {
    log.error(error);

    res.status(400).json({
      msg: "get activity pattern gagal",
      errMsg: error,
    });
  }
};

export const getAllActivityPattern = async (req, res) => {
  try {
    const result = (await getAllActivityPatternModels()).recordset;
    res.status(200).json({
      msg: "get activity pattern berhasil",
      data: result,
    });
  } catch (error) {
    log.error(error);

    res.status(400).json({
      msg: "get activity pattern gagal",
      errMsg: error,
    });
  }
};
