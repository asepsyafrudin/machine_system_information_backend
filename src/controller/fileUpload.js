import { log } from "../config/logConfig.js";
import {
  createfileUploadGeneralModels,
  deleteFileUploadGeneralModels,
} from "../models/fileUpload.js";

export const createFileUploadGeneral = async (req, res) => {
  try {
    let filename =
      req.protocol +
      "://" +
      req.get("host") +
      "/static/profile/" +
      req.file.filename;
    await createfileUploadGeneralModels(req.body, filename);

    res.status(200).json({
      msg: "data berhasil di submit",
      data: req.body,
    });
  } catch (error) {
    log.error(error);
    res.status(400).json({
      msg: "data gagal di submit",
      errMsg: error,
    });
  }
};

export const deleteFileUploadGeneral = async (req, res) => {
  try {
    await deleteFileUploadGeneralModels(req.params.id);
    res.status(200).json({
      msg: "data berhasil di submit",
      data: req.params.id,
    });
  } catch (error) {
    log.error(error);
    res.status(400).json({
      msg: "data gagal di delete",
      errMsg: error,
    });
  }
};
