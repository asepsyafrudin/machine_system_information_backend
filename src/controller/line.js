import {
  createLineModels,
  getAllLineModels,
  searchLineModels,
  updateLineModels,
  updateStatusLineModels,
  deleteLineModels,
} from "../models/line.js";

export const createLine = async (req, res) => {
  try {
    await createLineModels(req.body);
    res.status(200).json({
      msg: "line berhasil di submit",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "line gagal di submit",
      errMsg: error,
    });
  }
};

export const getAllLine = async (req, res) => {
  try {
    const [result] = await getAllLineModels();
    res.status(200).json({
      msg: "Get All Line Berhasil",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "product gagal di cari",
      errMsg: error,
    });
  }
};

export const updateLine = async (req, res) => {
  try {
    await updateLineModels(req.body);
    res.status(200).json({
      msg: "line berhasil di update",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "product gagal di update",
      errMsg: error,
    });
  }
};

export const updateStatusLine = async (req, res) => {
  try {
    await updateStatusLineModels(req.body);
    res.status(200).json({
      msg: "line berhasil di update",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "product gagal di update",
      errMsg: error,
    });
  }
};

export const searchLine = async (req, res) => {
  try {
    const [result] = await searchLineModels(req.params.searchValue);
    res.status(200).json({
      msg: "line berhasil di cari",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "product gagal di cari",
      errMsg: error,
    });
  }
};

export const deleteLine = async (req, res) => {
  try {
    await deleteLineModels(req.params.id);
    res.status(200).json({
      msg: "line berhasil di delete",
      data: req.params.id,
    });
  } catch (error) {
    res.status(400).json({
      msg: "product gagal di delete",
      errMsg: error,
    });
  }
};
