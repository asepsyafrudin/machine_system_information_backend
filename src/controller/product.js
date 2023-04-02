import {
  createProductModels,
  deleteProductModels,
  getAllProductModels,
  searchProductModels,
  updateProductNameModels,
  updateProductStatusModels,
} from "../models/product.js";

export const createProduct = async (req, res) => {
  try {
    await createProductModels(req.body);
    res.status(200).json({
      msg: "product submit success",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "product gagal di buat",
      errMsg: error,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await deleteProductModels(req.params.id);
    res.status(200).json({
      msg: "product berhasil di delete",
      data: req.params.id,
    });
  } catch (error) {
    res.status(400).json({
      msg: "product gagal di hapus",
      errMsg: error,
    });
  }
};

export const updateProductName = async (req, res) => {
  try {
    await updateProductNameModels(req.body);
    res.status(200).json({
      msg: "product name berhasil di update",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "product gagal di update",
      errMsg: error,
    });
  }
};

export const updateProductStatus = async (req, res) => {
  try {
    await updateProductStatusModels(req.body);
    res.status(200).json({
      msg: "product status berhasil di update",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "product gagal di update",
      errMsg: error,
    });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const [result] = await getAllProductModels();
    res.status(200).json({
      msg: "Get All Product Berhasil",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "product gagal di ambil",
      errMsg: error,
    });
  }
};

export const searchProduct = async (req, res) => {
  try {
    const [result] = await searchProductModels(req.params.searchValue);
    res.status(200).json({
      msg: "Search Product Berhasil",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "product gagal di cari",
      errMsg: error,
    });
  }
};
