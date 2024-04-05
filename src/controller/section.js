import {
  createSectionModels,
  deleteSectionModels,
  getSectionByIdModels,
  getSectionModels,
  updateSectionModels,
} from "../models/section.js";

export const createSection = async (req, res) => {
  try {
    let id = 0;
    if (req.body.id) {
      id = req.body.id;
    }

    const result = (await getSectionByIdModels(id)).recordset;
    if (result.length > 0) {
      await updateSectionModels(req.body);
    } else {
      await createSectionModels(req.body);
    }

    res.status(200).json({
      msg: "create section berhasil",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: " create berhasil gagal",
      errMsg: error,
    });
  }
};

export const getSection = async (req, res) => {
  try {
    const result = (await getSectionModels()).recordset;
    res.status(200).json({
      msg: "get data berhasil",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: " create berhasil gagal",
      errMsg: error,
    });
  }
};

export const deleteSection = async (req, res) => {
  try {
    await deleteSectionModels(req.params.id);
    res.status(200).json({
      msg: "delete data berhasil",
      data: req.params.id,
    });
  } catch (error) {
    res.status(400).json({
      msg: " create berhasil gagal",
      errMsg: error,
    });
  }
};
