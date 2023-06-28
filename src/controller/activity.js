import {
  createActivityModels,
  deleteActivityByProjectId,
  getAllActivity,
  updateActivityModels,
} from "../models/activity.js";
import {
  createDependenciesModels,
  deleteDependenciesModels,
} from "../models/dependencies.js";

export const createActivity = async (req, res) => {
  try {
    const dataSave = req.body;
    if (dataSave.length > 0) {
      for (let index = 0; index < dataSave.length; index++) {
        const [checkData] = await getActivityByActivityIdModels(
          dataSave[index].id
        );
        if (checkData.length > 0) {
          await updateActivityModels(dataSave[index]);
          await deleteDependenciesModels(dataSave[index].id);
          await createDependenciesModels(
            dataSave[index].id,
            dataSave[index].dependencies[0]
          );
        } else {
          await createActivityModels(dataSave[index]);
          if (dataSave[index].dependencies.length > 0) {
            await createDependenciesModels(
              dataSave[index].id,
              dataSave[index].dependencies[0]
            );
          }
        }
      }
    }
    res.status(200).json({
      msg: "activity berhasil di post",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "activity gagal di create",
      errMsg: error,
    });
  }
};

export const updateActivity = async (req, res) => {
  try {
    const dataSave = req.body;
    const project_id = dataSave[0].project;
    await deleteActivityByProjectId(project_id);
    if (dataSave.length > 0) {
      for (let index = 0; index < dataSave.length; index++) {
        await deleteDependenciesModels(dataSave[index].id);
        await createActivityModels(dataSave[index]);
        if (dataSave[index].dependencies.length > 0) {
          await createDependenciesModels(
            dataSave[index].id,
            dataSave[index].dependencies[0]
          );
        }
      }
    }
    res.status(200).json({
      msg: "activity berhasil di post",
      data: req.body,
    });
  } catch (error) {}
};
