import {
  getSettingByProjectIdModels,
  saveSettingProjectActivityModel,
  updateSettingProjectActivityModel,
} from "../models/setting.js";

export const saveSettingProjectActivity = async (req, res) => {
  try {
    let switch_mode = 0;
    if (req.body.switch_mode === true) {
      switch_mode = 1;
    }
    req.body.switchMode = switch_mode;
    const result = (await getSettingByProjectIdModels(req.body.projectId))
      .recordset;
    if (result.length > 0) {
      await updateSettingProjectActivityModel(req.body);
    } else {
      await saveSettingProjectActivityModel(req.body);
    }
    res.status(200).json({
      msg: "setting configuration berhasil di save",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "setting configuration gagal di save",
      errMsg: error,
    });
  }
};

export const getSettingByProjectId = async (req, res) => {
  try {
    const result = (await getSettingByProjectIdModels(req.params.id)).recordset;
    res.status(200).json({
      msg: "setting berhasil di get",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "setting gagal di get",
      errMsg: error,
    });
  }
};
