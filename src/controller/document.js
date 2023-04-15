import {
  changeStatusDocumentModels,
  createDocumentModels,
  deleteDocumentByIdModels,
  getAllDocumentByUserIdModels,
  getAllDocumentForGeneralModels,
  getAllDocumentModels,
  getDocumentByIdModels,
  searchAllDocumentModels,
  searchDocumentForAdminModels,
  searchDocumentForUserModels,
  updateDocumentByIdModels,
} from "../models/document.js";
import {
  createFilesModels,
  deleteFileByDocumentIdModels,
  getFileByDocumentId,
} from "../models/file.js";
import { getUserByUserIdModels } from "../models/user.js";
import { v4 as uuidv4 } from "uuid";

export const createDocument = async (req, res) => {
  try {
    const id = uuidv4();
    await createDocumentModels(req.body, id);
    const file = req.files;
    const document_id = id;
    if (file) {
      for (let index = 0; index < file.length; index++) {
        let filename =
          req.protocol +
          "://" +
          req.get("host") +
          "/static/files/" +
          file[index].filename;
        await createFilesModels(document_id, filename, file[index].filename);
      }
      res.status(200).json({
        msg: "Submit Data Document dan File Berhasil",
        data: req.body,
      });
    } else {
      res.status(200).json({
        msg: "Submit Data Document Berhasil",
        data: req.body,
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "Submit Data Gagal",
      errMsg: error,
    });
  }
};

export const updateDocumentById = async (req, res) => {
  try {
    await updateDocumentByIdModels(req.body);
    const file = req.files;
    const document_id = req.body.id;
    if (file) {
      for (let index = 0; index < file.length; index++) {
        let filename =
          req.protocol +
          "://" +
          req.get("host") +
          "/static/files/" +
          file[index].filename;
        await createFilesModels(document_id, filename, file[index].filename);
      }
      res.status(200).json({
        msg: "Submit Data Document dan File Berhasil",
        data: req.body,
      });
    } else {
      res.status(200).json({
        msg: "Submit Data Document Berhasil",
        data: req.body,
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "Submit Data Gagal",
      errMsg: error,
    });
  }
};

export const getDocumentForGeneralByPage = async (req, res) => {
  try {
    const page = req.params.page;
    const dataPerPage = 10;
    const [result] = await getAllDocumentForGeneralModels();
    const totalPageData = Math.ceil(result.length / dataPerPage);
    let listData = [];
    for (
      let index = (page - 1) * dataPerPage;
      index < page * dataPerPage && index < result.length;
      index++
    ) {
      const [fileResult] = await getFileByDocumentId(result[index].id);
      listData.push({
        id: result[index].id,
        title: result[index].title,
        create_date: result[index].create_date,
        description: result[index].description,
        user_id: result[index].user_id,
        username: result[index].username,
        photo: result[index].photo,
        email: result[index].email,
        machine_id: result[index].machine_id,
        machine_name: result[index].machine_name,
        line_id: result[index].line_id,
        line_name: result[index].line_name,
        product_id: result[index].product_id,
        product_name: result[index].product_name,
        status: result[index].status,
        file_type: result[index].file_type,
        file: fileResult,
      });
    }
    res.status(200).json({
      msg: "get data berhasil di ambil",
      dataPerPage: dataPerPage,
      numberStart: (page - 1) * dataPerPage + 1,
      totalPageData: totalPageData,
      data: listData,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Get Data Gagal",
      errMsg: error,
    });
  }
};

export const getDocumentByPage = async (req, res) => {
  try {
    const page = req.params.page;
    const dataPerPage = 10;
    const [result] = await getAllDocumentModels();
    const totalPageData = Math.ceil(result.length / dataPerPage);
    let listData = [];
    for (
      let index = (page - 1) * dataPerPage;
      index < page * dataPerPage && index < result.length;
      index++
    ) {
      const [fileResult] = await getFileByDocumentId(result[index].id);
      listData.push({
        id: result[index].id,
        title: result[index].title,
        create_date: result[index].create_date,
        description: result[index].description,
        user_id: result[index].user_id,
        username: result[index].username,
        photo: result[index].photo,
        email: result[index].email,
        machine_id: result[index].machine_id,
        machine_name: result[index].machine_name,
        line_id: result[index].line_id,
        line_name: result[index].line_name,
        product_id: result[index].product_id,
        product_name: result[index].product_name,
        status: result[index].status,
        file_type: result[index].file_type,
        file: fileResult,
      });
    }
    res.status(200).json({
      msg: "get data berhasil di ambil",
      dataPerPage: dataPerPage,
      numberStart: (page - 1) * dataPerPage + 1,
      totalPageData: totalPageData,
      data: listData,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Get Data Gagal",
      errMsg: error,
    });
  }
};

export const getDocumentByUserIdAndPage = async (req, res) => {
  try {
    const userId = req.params.userId;
    const page = req.params.page;
    const dataPerPage = 10;
    const [result] = await getAllDocumentByUserIdModels(userId);
    const totalPageData = Math.ceil(result.length / dataPerPage);
    let listData = [];
    for (
      let index = (page - 1) * dataPerPage;
      index < page * dataPerPage && index < result.length;
      index++
    ) {
      const [fileResult] = await getFileByDocumentId(result[index].id);
      listData.push({
        id: result[index].id,
        title: result[index].title,
        create_date: result[index].create_date,
        description: result[index].description,
        user_id: result[index].user_id,
        username: result[index].username,
        photo: result[index].photo,
        email: result[index].email,
        machine_id: result[index].machine_id,
        machine_name: result[index].machine_name,
        line_id: result[index].line_id,
        line_name: result[index].line_name,
        product_id: result[index].product_id,
        product_name: result[index].product_name,
        status: result[index].status,
        file_type: result[index].file_type,
        file: fileResult,
      });
    }
    res.status(200).json({
      msg: "get data berhasil di ambil",
      dataPerPage: dataPerPage,
      numberStart: (page - 1) * dataPerPage + 1,
      totalPageData: totalPageData,
      data: listData,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Get Data By User Id Gagal",
      errMsg: error,
    });
  }
};

//search document for search engine page
export const searchDocumentByPage = async (req, res) => {
  try {
    const search = req.params.searchValue;
    const page = req.params.page;
    const dataPerPage = 10;
    const [result] = await searchAllDocumentModels(search);
    const totalPageData = Math.ceil(result.length / dataPerPage);
    let listData = [];
    for (
      let index = (page - 1) * dataPerPage;
      index < page * dataPerPage && index < result.length;
      index++
    ) {
      const [fileResult] = await getFileByDocumentId(result[index].id);
      listData.push({
        id: result[index].id,
        title: result[index].title,
        create_date: result[index].create_date,
        description: result[index].description,
        user_id: result[index].user_id,
        username: result[index].username,
        photo: result[index].photo,
        email: result[index].email,
        machine_id: result[index].machine_id,
        machine_name: result[index].machine_name,
        line_id: result[index].line_id,
        line_name: result[index].line_name,
        product_id: result[index].product_id,
        product_name: result[index].product_name,
        status: result[index].status,
        file_type: result[index].file_type,
        file: fileResult,
      });
    }
    res.status(200).json({
      msg: "get data berhasil di ambil",
      dataPerPage: dataPerPage,
      numberStart: (page - 1) * dataPerPage + 1,
      totalPageData: totalPageData,
      data: listData,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Get Data Gagal",
      errMsg: error,
    });
  }
};

//search document for  User or admin Menu
export const searchDocumentForDashboardMenu = async (req, res) => {
  try {
    const search = req.params.searchValue;
    const page = req.params.page;
    const userId = req.params.userId;
    const [dataUser] = await getUserByUserIdModels(userId);
    const [result] =
      dataUser[0].position === "Administrator"
        ? await searchDocumentForAdminModels(search)
        : await searchDocumentForUserModels(dataUser[0].id, search);

    const dataPerPage = 10;
    const totalPageData = Math.ceil(result.length / dataPerPage);
    let listData = [];
    for (
      let index = (page - 1) * dataPerPage;
      index < page * dataPerPage && index < result.length;
      index++
    ) {
      const [fileResult] = await getFileByDocumentId(result[index].id);
      listData.push({
        id: result[index].id,
        title: result[index].title,
        create_date: result[index].create_date,
        description: result[index].description,
        user_id: result[index].user_id,
        username: result[index].username,
        photo: result[index].photo,
        email: result[index].email,
        machine_id: result[index].machine_id,
        machine_name: result[index].machine_name,
        line_id: result[index].line_id,
        line_name: result[index].line_name,
        product_id: result[index].product_id,
        product_name: result[index].product_name,
        status: result[index].status,
        file_type: result[index].file_type,
        file: fileResult,
      });
    }
    res.status(200).json({
      msg: "get data berhasil di ambil",
      dataPerPage: dataPerPage,
      numberStart: (page - 1) * dataPerPage + 1,
      totalPageData: totalPageData,
      data: listData,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Get Data Gagal",
      errMsg: error,
    });
  }
};

export const deleteDocumentbyId = async (req, res) => {
  try {
    await deleteFileByDocumentIdModels(req.params.id);
    await deleteDocumentByIdModels(req.params.id);
    res.status(200).json({
      msg: "Delete Data Document Berhasil",
      data: req.params.id,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Delete Data Gagal",
      errMsg: error,
    });
  }
};

export const changeStatusDocument = async (req, res) => {
  try {
    await changeStatusDocumentModels(req.body);
    res.status(200).json({
      msg: "Delete Data Document Berhasil",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Change Data Gagal",
      errMsg: error,
    });
  }
};

export const getDocumentById = async (req, res) => {
  try {
    const page = 1;
    const dataPerPage = 10;
    const [result] = await getDocumentByIdModels(req.params.id);
    const totalPageData = Math.ceil(result.length / dataPerPage);
    let listData = [];
    for (
      let index = (page - 1) * dataPerPage;
      index < page * dataPerPage && index < result.length;
      index++
    ) {
      const [fileResult] = await getFileByDocumentId(result[index].id);
      listData.push({
        id: result[index].id,
        title: result[index].title,
        create_date: result[index].create_date,
        description: result[index].description,
        user_id: result[index].user_id,
        username: result[index].username,
        photo: result[index].photo,
        email: result[index].email,
        machine_id: result[index].machine_id,
        machine_name: result[index].machine_name,
        line_id: result[index].line_id,
        line_name: result[index].line_name,
        product_id: result[index].product_id,
        product_name: result[index].product_name,
        status: result[index].status,
        file_type: result[index].file_type,
        file: fileResult,
      });
    }
    res.status(200).json({
      msg: "get data berhasil di ambil",
      dataPerPage: dataPerPage,
      numberStart: (page - 1) * dataPerPage + 1,
      totalPageData: totalPageData,
      data: listData,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Get Data Gagal",
      errMsg: error,
    });
  }
};
