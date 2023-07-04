import {
  createActivityModels,
  deleteActivityByActivityId,
  getActivityByActivityIdModels,
  getActivityByProjectIdModels,
  updateActivityModels,
} from "../models/activity.js";
import {
  createDependenciesModels,
  deleteDependenciesModels,
  getDependenciesByActivityIdModels,
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

      const [newDataAfterCreate] = await getActivityByProjectIdModels(
        dataSave[0].project
      );
      if (newDataAfterCreate.length > 0) {
        for (let index = 0; index < newDataAfterCreate.length; index++) {
          const checkData = dataSave.find(
            (value) => value.id === newDataAfterCreate[index].id
          );
          if (!checkData) {
            await deleteActivityByActivityId(newDataAfterCreate[index].id);
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

export const getActivityByProjectId = async (req, res) => {
  try {
    const [result] = await getActivityByProjectIdModels(req.params.projectId);

    let dataSend = [];
    if (result.length > 0) {
      for (let index = 0; index < result.length; index++) {
        const [dependencies] = await getDependenciesByActivityIdModels(
          result[index].id
        );
        let data = {
          id: result[index].id,
          start: result[index].start,
          end: result[index].finish,
          name: result[index].name,
          progress: result[index].progress,
          dependencies: dependencies.length > 0 ? [dependencies[0].name] : [],
          type: result[index].type,
          project: result[index].project_id,
        };
        dataSend.push(data);
      }
    }
    res.status(200).json({
      msg: "get activity berhasil",
      data: dataSend,
    });
  } catch (error) {
    res.status(400).json({
      msg: "get activity gagal",
      errMsg: error,
    });
  }
};
