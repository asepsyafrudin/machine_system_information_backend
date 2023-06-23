import { getFileByDocumentId } from "../models/file.js";
import { getFTaLv1ByProblemIdModels } from "../models/ftaLv1.js";
import { getFtaLv2ModelsByLv1Id } from "../models/ftaLv2.js";
import {
  countDataProblem,
  createProblemModels,
  deleteProblemModels,
  getAllProblemModels,
  getProblemByIdModels,
  getProblemModelsByMachineId,
  searchProblemByIdMachineModels,
} from "../models/problem.js";

export const createProblem = async (req, res) => {
  try {
    await createProblemModels(req.body);
    res.status(200).json({
      msg: "problem berhasil di post",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "prooblem gagal di post",
      errMsg: error,
    });
  }
};

export const getAllProblemList = async (req, res) => {
  try {
    const page = req.params.page;
    const dataPerPage = 10;
    const offset = (page - 1) * dataPerPage;
    const [result] = await getAllProblemModels(dataPerPage, offset);
    const [totalData] = await countDataProblem();
    const totalPageData = Math.ceil(totalData[0].count / dataPerPage);
    res.status(200).json({
      msg: "get problem berhasil",
      dataPerage: dataPerPage,
      numberStart: (page - 1) * dataPerPage + 1,
      totalPageData: totalPageData,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "problem gagal di get",
      errMsg: error,
    });
  }
};

export const searchProblemByMachineId = async (req, res) => {
  try {
    const machineId = req.params.machineId;
    const page = req.params.page;
    const dataPerPage = 10;
    const offset = (page - 1) * dataPerPage;
    const [result] = await searchProblemByIdMachineModels(
      machineId,
      dataPerPage,
      offset
    );

    const [countData] = await getProblemModelsByMachineId(machineId);
    const totalPageData = Math.ceil(countData.length / dataPerPage);

    res.status(200).json({
      msg: "get problem berhasil",
      dataPerage: dataPerPage,
      numberStart: (page - 1) * dataPerPage + 1,
      totalPageData: totalPageData,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "problem gagal di get",
      errMsg: error,
    });
  }
};

export const getProblemByMachieId = async (req, res) => {
  try {
    const [result] = await getProblemModelsByMachineId(req.params.machineId);
    res.status(200).json({
      msg: "problem berhasil di get",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "problem gagal di get",
      errMsg: error,
    });
  }
};

export const getProblemById = async (req, res) => {
  try {
    const [result] = await getProblemByIdModels(req.params.id);
    const [ftaLv1] = await getFTaLv1ByProblemIdModels(result[0].id);
    let dataFTALv1 = [];
    let dataFTALv2 = [];
    if (ftaLv1.length > 0) {
      for (let index = 0; index < ftaLv1.length; index++) {
        const [ftaLv1FileResult] = await getFileByDocumentId(ftaLv1[index].id);
        dataFTALv1.push({
          id: ftaLv1[index].id,
          type: ftaLv1[index].type,
          name: ftaLv1[index].description,
          attachment: ftaLv1FileResult,
        });

        const [ftaLv2] = await getFtaLv2ModelsByLv1Id(ftaLv1[index].id);
        if (ftaLv2.length > 0) {
          for (let index = 0; index < ftaLv2.length; index++) {
            const [FtaLv2FileResult] = await getFileByDocumentId(
              ftaLv2[index].id
            );
            dataFTALv2.push({
              idAnalysis2: ftaLv2[index].id,
              type: ftaLv2[index].type,
              name: ftaLv2[index].description,
              id: ftaLv2[index].level1_id,
              attachment: FtaLv2FileResult,
            });
          }
        }
      }
    }

    res.status(200).json({
      msg: "problem berhasil di get",
      data: result,
      dataFTA1: dataFTALv1,
      dataFTA2: dataFTALv2,
    });
  } catch (error) {
    res.status(400).json({
      msg: "problem gagal di get",
      errMsg: error,
    });
  }
};

export const deleteProblem = async (req, res) => {
  try {
    await deleteProblemModels(req.params.id);
    res.status(200).json({
      msg: "delete berhasil",
      data: req.params.id,
    });
  } catch (error) {
    res.status(400).json({
      msg: "problem gagal di delete",
      errMsg: error,
    });
  }
};
