import { comparePassword } from "../config/hashPassword.js";
import {
  createUserModels,
  getAllUsersModels,
  deleteUserModels,
  updateUsersModels,
  findUserModels,
  getUserByUserIdModels,
  getUserByNPKModels,
  getUserByEmailModels,
  changePasswordModels,
  resetPhotoProfileModels,
} from "../models/user.js";

export const createUser = async (req, res) => {
  try {
    let filename = "";
    if (!req.file) {
      filename = "";
    } else {
      filename =
        req.protocol +
        "://" +
        req.get("host") +
        "/static/profile/" +
        req.file.filename;
    }
    await createUserModels(req.body, filename);
    res.status(200).json({
      msg: "Submit Data Berhasil",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Submit Data Gagal",
      errMsg: error,
    });
  }
};

export const editUser = async (req, res) => {
  try {
    let filename = "";
    if (!req.file) {
      filename = "";
    } else {
      filename =
        req.protocol +
        "://" +
        req.get("host") +
        "/static/profile/" +
        req.file.filename;
    }

    await updateUsersModels(req.body, filename);
    res.status(200).json({
      msg: "Submit Data Berhasil",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Submit Data Gagal",
      errMsg: error,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const [result] = await getAllUsersModels();
    res.status(200).json({
      msg: "Data Berhasil di Ambil",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Penarikan Data Gagal",
      errMsg: error,
    });
  }
};

export const findUserById = (req, res) => {
  res.json({
    msg: "find user by id",
    data: "disini nanti datanya",
  });
};

export const deleteUser = async (req, res) => {
  try {
    await deleteUserModels(req.params.id);
    res.status(200).json({
      msg: "Data Berhasil di delete",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Data gagal di hapus",
      errMsg: error,
    });
  }
};

export const findUser = async (req, res) => {
  try {
    const [result] = await findUserModels(req.params.searchValue);
    const page = req.params.page;
    const dataPerPage = 10;
    const totalPageData = Math.ceil(result.length / dataPerPage);
    let listData = [];
    for (
      let index = (page - 1) * dataPerPage;
      index < page * dataPerPage && index < result.length;
      index++
    ) {
      listData.push(result[index]);
    }
    if (listData.length !== 0) {
      res.status(200).json({
        msg: "Data Berhasil di Ambil",
        page: req.params.page,
        dataPerPage: dataPerPage,
        numberStart: (page - 1) * dataPerPage + 1,
        totalPageData: totalPageData,
        data: listData,
      });
    } else {
      res.status(200).json({
        msg: "Data Kosong",
        page: req.params.page,
        dataPerPage: dataPerPage,
        totalPageData: totalPageData,
        data: listData,
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "Data gagal di cari",
      errMsg: error,
    });
  }
};

export const getUserByUserId = async (req, res) => {
  try {
    const [result] = await getUserByUserIdModels(req.params.userId);
    res.status(200).json({
      msg: "data berhasil di cari",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Data gagal di cari",
      errMsg: error,
    });
  }
};

export const getUserByPage = async (req, res) => {
  try {
    const page = req.params.page;
    const dataPerPage = 10;
    const [result] = await getAllUsersModels();
    const totalPageData = Math.ceil(result.length / dataPerPage);
    let listData = [];
    for (
      let index = (page - 1) * dataPerPage;
      index < page * dataPerPage && index < result.length;
      index++
    ) {
      listData.push(result[index]);
    }
    if (listData.length !== 0) {
      res.status(200).json({
        msg: "Data Berhasil di Ambil",
        page: req.params.page,
        dataPerPage: dataPerPage,
        numberStart: (page - 1) * dataPerPage + 1,
        totalPageData: totalPageData,
        data: listData,
      });
    } else {
      res.status(200).json({
        msg: "Data Kosong",
        page: req.params.page,
        dataPerPage: dataPerPage,
        totalPageData: totalPageData,
        data: listData,
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "Data gagal di ambil",
      errMsg: error,
    });
  }
};

export const userCheckPassword = (req, res) => {
  const reTypePassword = req.body.reTypePassword;
  const oldPassword = req.body.oldPassword;
  const compare = comparePassword(reTypePassword, oldPassword);
  if (compare) {
    res.status(200).json({
      msg: "Password Sama ",
      data: req.body.reTypePassword,
    });
  } else {
    res.status(200).json({
      msg: "Password Beda",
      data: "",
    });
  }
};

export const getUserByNPK = async (req, res) => {
  try {
    const [result] = await getUserByNPKModels(req.params.npk);
    res.status(200).json({
      msg: "result get user by npk ",
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      msg: "Password Beda",
      errMsg: error,
    });
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const [result] = await getUserByEmailModels(req.params.email);
    res.status(200).json({
      msg: "result get user by email ",
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      msg: "Password Beda",
      errMsg: error,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    await changePasswordModels(req.body);
    res.status(200).json({
      msg: "change password berhasil",
      data: req.body,
    });
  } catch (error) {
    res.status(200).json({
      msg: "change password gagal",
      errMsg: error,
    });
  }
};

export const resetPhotoProfile = async (req, res) => {
  try {
    await resetPhotoProfileModels(req.params.id);
    res.status(200).json({
      msg: "reset photo success",
      data: req.params.id,
    });
  } catch (error) {
    res.status(200).json({
      msg: "reset photo gagal",
      errMsg: error,
    });
  }
};
