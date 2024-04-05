import { getUserByUserIdModels } from "../models/user.js";
import {
  createVideoModels,
  deleteVideoModels,
  getAllVideoForAdminModels,
  getAllVideoModels,
  getVideoByIdModels,
  getVideoByProjectIdModels,
  getVideoByUserIdModels,
  searchVideoForAdminModels,
  searchVideoForUserModels,
  searchVideoModels,
  updateStatusVideoModels,
  updateVideoModels,
} from "../models/video.js";
import { v4 as uuidv4 } from "uuid";

export const createVideo = async (req, res) => {
  try {
    const id = uuidv4();
    let filename = "";
    if (!req.file) {
      filename = "";
    } else {
      filename =
        req.protocol +
        "://" +
        req.get("host") +
        "/static/video/" +
        req.file.filename;
    }

    await createVideoModels(req.body, filename, id);
    res.status(200).json({
      msg: "video berhasil di upload",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "video gagal di upload",
      errMsg: error,
    });
  }
};

export const getAllVideo = async (req, res) => {
  try {
    const result = (await getAllVideoModels()).recordset;
    res.status(200).json({
      msg: "video berhasil di ambil",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "video gagal di ambil",
      errMsg: error,
    });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    await deleteVideoModels(req.params.id);
    res.status(200).json({
      msg: "video berhasil di delete",
      data: req.params.id,
    });
  } catch (error) {
    res.status(400).json({
      msg: "video gagal di delete",
      errMsg: error,
    });
  }
};

export const updateVideo = async (req, res) => {
  try {
    let filename = "";
    if (!req.file) {
      filename = req.body.video;
    } else {
      filename =
        req.protocol +
        "://" +
        req.get("host") +
        "/static/video/" +
        req.file.filename;
    }

    await updateVideoModels(req.body, filename);
    res.status(200).json({
      msg: "video berhasil di update",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "video gagal di update",
      errMsg: error,
    });
  }
};

export const updateStatusVideo = async (req, res) => {
  try {
    await updateStatusVideoModels(req.body);
    res.status(200).json({
      msg: "video berhasil di update",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "video gagal di update",
      errMsg: error,
    });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const result = (await getVideoByIdModels(req.params.id)).recordset;
    res.status(200).json({
      msg: "video berhasil di ambil",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "video gagal di ambil",
      errMsg: error,
    });
  }
};

export const getVideoByProjectId = async (req, res) => {
  try {
    const result = (await getVideoByProjectIdModels(req.params.projectId)).recordset;
    res.status(200).json({
      msg: "video berhasil di ambil",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "video gagal di ambil",
      errMsg: error,
    });
  }
};

export const getVideoByUserId = async (req, res) => {
  try {
    const result = (await getVideoByUserIdModels(req.params.userId)).recordset;
    const page = req.params.page;
    const dataPerPage = 8;
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
        msg: "video berhasil di cari",
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
      msg: "video gagal di ambil",
      errMsg: error,
    });
  }
};

export const getVideoByPage = async (req, res) => {
  try {
    const page = req.params.page;
    const dataPerPage = 8;
    const result = (await getAllVideoModels()).recordset;
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
      msg: "video gagal di ambil",
      errMsg: error,
    });
  }
};

export const getVideoByPageAdmin = async (req, res) => {
  try {
    const page = req.params.page;
    const dataPerPage = 8;
    const result = (await getAllVideoForAdminModels()).recordset;
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
      msg: "video gagal di ambil",
      errMsg: error,
    });
  }
};

//searchvideo for search Engine Page
export const searchVideo = async (req, res) => {
  try {
    const page = req.params.page;
    const result = (await searchVideoModels(req.params.searchValue)).recordset;
    const dataPerPage = 8;
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
        msg: "video berhasil di cari",
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
      msg: "video gagal di cari",
      errMsg: error,
    });
  }
};

export const searchVideoForDashbordMenu = async (req, res) => {
  try {
    const page = req.params.page;
    const userId = req.params.userId;
    const search = req.params.searchValue;

    const userData = (await getUserByUserIdModels(userId)).recordset;
    const [result] =
      userData[0].position === "Administrator"
        ? (await searchVideoForAdminModels(search)).recordset
        : (await searchVideoForUserModels(userId, search)).recordset;
    const dataPerPage = 8;
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
        msg: "video berhasil di cari",
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
      msg: "video gagal di cari",
      errMsg: error,
    });
  }
};
