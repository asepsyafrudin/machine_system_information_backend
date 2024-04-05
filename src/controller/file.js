import {
  createFilesModels,
  deleteFileByIdModels,
  getFileByDocumentId,
} from "../models/file.js";

export const createFile = async (req, res) => {
  try {
    const id = req.body.id;
    const file = req.files;
    if (file.length > 0) {
      for (let index = 0; index < file.length; index++) {
        let filename =
          req.protocol +
          "://" +
          req.get("host") +
          "/static/files/" +
          file[index].filename;
        await createFilesModels(id, filename, file[index].filename);
      }
    }
    res.status(200).json({
      msg: "create File Berhasil",
      data: id,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Submit Data Gagal",
      errMsg: error,
    });
  }
};

export const deleteFileById = async (req, res) => {
  try {
    await deleteFileByIdModels(req.params.id);
    res.status(200).json({
      msg: "Hapus File Berhasil",
      data: req.params.id,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Submit Data Gagal",
      errMsg: error,
    });
  }
};

export const getFile = async (req, res) => {
  try {
    const result = (await getFileByDocumentId(req.params.id)).recordset;
    res.status(200).json({
      msg: "get File Berhasil",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Get Data Gagal",
      errMsg: error,
    });
  }
};
