import { getDataManagerListModels } from "../models/approval.js";
import {
  changeStatusDocumentModels,
  createDocumentModels,
  deleteDocumentByIdModels,
  getAllDocumentByUserIdModels,
  getAllDocumentForGeneralModels,
  getAllDocumentModels,
  getDocumentByIdModels,
  getDocumentByProjectIdModels,
  getDocumentReportModels,
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
import { getUserByNPKModels, getUserByUserIdModels } from "../models/user.js";
import { v4 as uuidv4 } from "uuid";

const managerFunction = async (npk) => {
  const manager = (await getUserByNPKModels(npk)).recordset;
  return manager;
};

export const createDocument = async (req, res) => {
  try {
    const id = uuidv4();
    await createDocumentModels(req.body, id);
    const file = req.files;
    const product_id_document = req.body.product_id;
    const document_id = id;
    if (file.length > 0) {
      for (let index = 0; index < file.length; index++) {
        let filename =
          req.protocol +
          "://" +
          req.get("host") +
          "/static/files/" +
          file[index].filename;
        await createFilesModels(document_id, filename, file[index].filename);
      }

      // let managerApproval = "";
      // const getDataManagerList = (await getDataManagerListModels()).recordset;
      // if (getDataManagerList.length > 0) {
      //   for (let index = 0; index < getDataManagerList.length; index++) {
      //     getDataManagerList[index].product_id =
      //       getDataManagerList[index].product_id.split(",");
      //   }

      //   for (let index = 0; index < getDataManagerList.length; index++) {
      //     for (
      //       let index2 = 0;
      //       index2 < getDataManagerList[index].product_id.length;
      //       index2++
      //     ) {
      //       if (
      //         parseInt(getDataManagerList[index].product_id[index2]) ===
      //         parseInt(product_id_document)
      //       ) {
      //         managerApproval = getDataManagerList[index].manager_id;
      //         break;
      //       }
      //     }
      //   }
      // }

      // const managerEmail = await managerFunction(managerApproval);
      // console.log(managerEmail[0].email);
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

// export const getDocumentApproval = async (req, res) => {
//   try {
//     const page = req.params.page;
//     const dataPerPage = 10;
//     const result = (await getDocumentReportModels()).recordset;
//     let idProduct = [];
//     for (let i = 0; i < result.length; i++) {
//       const product_id = result[i].product_id;
//       idProduct.push(product_id);
//     }

//     const getDataManagerList = (await getDataManagerListModels()).recordset;
//     const totalPageData = Math.ceil(result.length / dataPerPage);

//     const listDataManagerAndDocument = [];
//     if (getDataManagerList.length > 0) {
//       for (let index = 0; index < getDataManagerList.length; index++) {
//         getDataManagerList[index].product_id =
//           getDataManagerList[index].product_id.split(",");
//       }

//       for (let index = 0; index < getDataManagerList.length; index++) {
//         for (
//           let index2 = 0;
//           index2 < getDataManagerList[index].product_id.length;
//           index2++
//         ) {
//           if (
//             parseInt(getDataManagerList[index].product_id[index2]) ===
//             parseInt(idProduct)
//           ) {
//             for (
//               let index3 = (page - 1) * dataPerPage;
//               index3 < page * dataPerPage && index3 < result.length;
//               index3++
//             ) {
//               const fileResult = (await getFileByDocumentId(result[index3].id))
//                 .recordset;
//               listDataManagerAndDocument.push({
//                 id: result[index3].id,
//                 title: result[index3].title,
//                 create_date: result[index3].create_date,
//                 description: result[index3].description,
//                 user_id: result[index3].user_id,
//                 username: result[index3].username,
//                 photo: result[index3].photo,
//                 email: result[index3].email,
//                 machine_id: result[index3].machine_id,
//                 machine_name: result[index3].machine_name,
//                 line_id: result[index3].line_id,
//                 line_name: result[index3].line_name,
//                 product_id: result[index3].product_id,
//                 product_name: result[index3].product_name,
//                 status: result[index3].status,
//                 file_type: result[index3].file_type,
//                 project_id: result[index3].project_id,
//                 file: fileResult,
//               });
//             }
//             res.status(200).json({
//               msg: "get data berhasil di ambil",
//               dataPerPage: dataPerPage,
//               numberStart: (page - 1) * dataPerPage + 1,
//               totalPageData: totalPageData,
//               data: listDataManagerAndDocument,
//             });
//           }
//         }
//       }
//     }
//   } catch (error) {
//     res.status(400).json({
//       msg: "Get Data Gagal",
//       errMsg: error,
//     });
//   }
// };

export const getDocumentApproval = async (req, res) => {
  try {
    const page = req.params.page;
    const dataPerPage = 10;
    const result = (await getDocumentReportModels()).recordset;
    let idProduct = [];
    for (let i = 0; i < result.length; i++) {
      const product_id = result[i].product_id;
      idProduct.push(product_id);
    }

    const getDataManagerList = (await getDataManagerListModels()).recordset;
    const totalPageData = Math.ceil(result.length / dataPerPage);

    const listDataManagerAndDocument = [];
    if (result.length > 0) {
      for (
        let index = (page - 1) * dataPerPage;
        index < page * dataPerPage && index < result.length;
        index++
      ) {
        const fileResult = (await getFileByDocumentId(result[index].id))
          .recordset;
        listDataManagerAndDocument.push({
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
          project_id: result[index].project_id,
          file: fileResult,
        });
      }
      res.status(200).json({
        msg: "get data berhasil di ambil",
        dataPerPage: dataPerPage,
        numberStart: (page - 1) * dataPerPage + 1,
        totalPageData: totalPageData,
        data: listDataManagerAndDocument,
      });
    }
    // if (getDataManagerList.length > 0) {
    //   for (let index = 0; index < getDataManagerList.length; index++) {
    //     getDataManagerList[index].product_id =
    //       getDataManagerList[index].product_id.split(",");
    //   }

    //   for (let index = 0; index < getDataManagerList.length; index++) {
    //     for (
    //       let index2 = 0;
    //       index2 < getDataManagerList[index].product_id.length;
    //       index2++
    //     ) {
    //       if (
    //         parseInt(getDataManagerList[index].product_id[index2]) ===
    //         parseInt(idProduct)
    //       ) {
    //         for (
    //           let index3 = (page - 1) * dataPerPage;
    //           index3 < page * dataPerPage && index3 < result.length;
    //           index3++
    //         ) {
    //           const fileResult = (await getFileByDocumentId(result[index3].id))
    //             .recordset;
    //           listDataManagerAndDocument.push({
    //             id: result[index3].id,
    //             title: result[index3].title,
    //             create_date: result[index3].create_date,
    //             description: result[index3].description,
    //             user_id: result[index3].user_id,
    //             username: result[index3].username,
    //             photo: result[index3].photo,
    //             email: result[index3].email,
    //             machine_id: result[index3].machine_id,
    //             machine_name: result[index3].machine_name,
    //             line_id: result[index3].line_id,
    //             line_name: result[index3].line_name,
    //             product_id: result[index3].product_id,
    //             product_name: result[index3].product_name,
    //             status: result[index3].status,
    //             file_type: result[index3].file_type,
    //             project_id: result[index3].project_id,
    //             file: fileResult,
    //           });
    //         }
    //         res.status(200).json({
    //           msg: "get data berhasil di ambil",
    //           dataPerPage: dataPerPage,
    //           numberStart: (page - 1) * dataPerPage + 1,
    //           totalPageData: totalPageData,
    //           data: listDataManagerAndDocument,
    //         });
    //       }
    //     }
    //   }
    // }
  } catch (error) {
    res.status(400).json({
      msg: "Get Data Gagal",
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
    const result = (await getAllDocumentForGeneralModels()).recordset;
    const totalPageData = Math.ceil(result.length / dataPerPage);
    let listData = [];
    for (
      let index = (page - 1) * dataPerPage;
      index < page * dataPerPage && index < result.length;
      index++
    ) {
      const fileResult = (await getFileByDocumentId(result[index].id))
        .recordset;
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
        project_id: result[index].project_id,
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
    const result = (await getAllDocumentModels()).recordset;
    const totalPageData = Math.ceil(result.length / dataPerPage);
    let listData = [];
    for (
      let index = (page - 1) * dataPerPage;
      index < page * dataPerPage && index < result.length;
      index++
    ) {
      const fileResult = (await getFileByDocumentId(result[index].id))
        .recordset;
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
        project_id: result[index].project_id,
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
    const result = (await getAllDocumentByUserIdModels(userId)).recordset;
    const totalPageData = Math.ceil(result.length / dataPerPage);
    let listData = [];
    for (
      let index = (page - 1) * dataPerPage;
      index < page * dataPerPage && index < result.length;
      index++
    ) {
      const fileResult = (await getFileByDocumentId(result[index].id))
        .recordset;
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
        project_id: result[index].project_id,
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
    const result = (await searchAllDocumentModels(search)).recordset;
    const totalPageData = Math.ceil(result.length / dataPerPage);
    let listData = [];
    for (
      let index = (page - 1) * dataPerPage;
      index < page * dataPerPage && index < result.length;
      index++
    ) {
      const fileResult = (await getFileByDocumentId(result[index].id))
        .recordset;
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
        project_id: result[index].project_id,
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
    const dataUser = (await getUserByUserIdModels(userId)).recordset;
    const result =
      dataUser[0].position === "Administrator"
        ? (await searchDocumentForAdminModels(search)).recordset
        : (await searchDocumentForUserModels(dataUser[0].id, search)).recordset;

    const dataPerPage = 10;
    const totalPageData = Math.ceil(result.length / dataPerPage);
    let listData = [];
    for (
      let index = (page - 1) * dataPerPage;
      index < page * dataPerPage && index < result.length;
      index++
    ) {
      const fileResult = (await getFileByDocumentId(result[index].id))
        .recordset;
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
        project_id: result[index].project_id,
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
    const result = (await getDocumentByIdModels(req.params.id)).recordset;
    const totalPageData = Math.ceil(result.length / dataPerPage);
    let listData = [];
    for (
      let index = (page - 1) * dataPerPage;
      index < page * dataPerPage && index < result.length;
      index++
    ) {
      const fileResult = (await getFileByDocumentId(result[index].id))
        .recordset;
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
        project_id: result[index].project_id,
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

export const getDocumentByProjectId = async (req, res) => {
  try {
    const page = 1;
    const dataPerPage = 10;
    const result = (await getDocumentByProjectIdModels(req.params.projectId))
      .recordset;
    const totalPageData = Math.ceil(result.length / dataPerPage);
    let listData = [];
    for (
      let index = (page - 1) * dataPerPage;
      index < page * dataPerPage && index < result.length;
      index++
    ) {
      const fileResult = (await getFileByDocumentId(result[index].id))
        .recordset;
      listData.push({
        id: result[index].id,
        project_id: result[index].project_id,
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
        project_id: result[index].project_id,
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
