import { log } from "../config/logConfig.js";
import { createFilesModels } from "../models/file.js";
import {
  createFtaLv1Models,
  getFTaLv1ByProblemIdModels,
} from "../models/ftaLv1.js";

export const createFtaLv1 = async (req, res) => {
  try {
    let filename = "";

    if (req.file) {
      filename =
        req.protocol +
        "://" +
        req.get("host") +
        "/static/files/" +
        req.file.filename;

      await createFilesModels(req.body.id, filename, req.file.filename);
    }

    await createFtaLv1Models(req.body);

    res.status(200).json({
      msg: "fta1 berhasil di upload",
      data: req.body,
    });
  } catch (error) {
    log.error(error);
    res.status(400).json({
      msg: "fta gagal di upload",
      errMsg: error,
    });
  }
};

export const getFTALv1ByProblemId = async (req, res) => {
  try {
    const result = (await getFTaLv1ByProblemIdModels(req.params.problemId))
      .recordset;
    res.status(200).json({
      msg: "fta1 berhasil di get",
      data: result,
    });
  } catch (error) {
    log.error(error);
    res.status(400).json({
      msg: "fta gagal di get",
      errMsg: error,
    });
  }
};
