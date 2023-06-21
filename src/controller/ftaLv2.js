import { createFtaLv2Models } from "../models/ftaLv2.js";
import { createFilesModels } from "../models/file.js";

export const createFtaLv2 = async (req, res) => {
  try {
    console.log("body", req.body);
    let filename = "";
    if (req.file) {
      filename = filename =
        req.protocol +
        "://" +
        req.get("host") +
        "/static/files/" +
        req.file.filename;

      await createFilesModels(req.body.id, filename, req.file.filename);
    }

    await createFtaLv2Models(req.body);
    res.status(200).json({
      msg: "fta lv2 berhasil di send",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "fta lv2 gagal di post",
      errMsg: error,
    });
  }
};
