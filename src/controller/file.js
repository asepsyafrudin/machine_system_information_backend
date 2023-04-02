import { deleteFileByIdModels } from "../models/file.js";

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
