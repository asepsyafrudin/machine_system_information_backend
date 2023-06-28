import {
  createMachineModels,
  deleteMachineModels,
  getAllMachineModels,
  searchMachineModel,
  updateMachineModels,
  updateStatusMachineModels,
} from "../models/machine.js";

export const createMachine = async (req, res) => {
  try {
    await createMachineModels(req.body);
    res.status(200).json({
      msg: "machine berhasil di submit",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "machine gagal di submit",
      errMsg: error,
    });
  }
};

export const getAllMachine = async (req, res) => {
  try {
    const [result] = await getAllMachineModels();
    res.status(200).json({
      msg: "machine berhasil di submit",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "machine gagal di ambil",
      errMsg: error,
    });
  }
};

export const deleteMachine = async (req, res) => {
  try {
    await deleteMachineModels(req.params.id);
    res.status(200).json({
      msg: "machine berhasil di hapus",
      data: req.params.id,
    });
  } catch (error) {
    res.status(400).json({
      msg: "machine gagal di hapus",
      errMsg: error,
    });
  }
};

export const updateStatusMachine = async (req, res) => {
  try {
    await updateStatusMachineModels(req.body);
    res.status(200).json({
      msg: "machine berhasil di update",
      data: req.params.id,
    });
  } catch (error) {
    res.status(400).json({
      msg: "machine gagal di update",
      errMsg: error,
    });
  }
};

export const updateMachine = async (req, res) => {
  try {
    await updateMachineModels(req.body);
    res.status(200).json({
      msg: "machine berhasil di update",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "machine gagal di update",
      errMsg: error,
    });
  }
};

export const searchMachine = async (req, res) => {
  try {
    const [result] = await searchMachineModel(req.params.searchValue);
    res.status(200).json({
      msg: "machine berhasil di ambil",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "machine gagal di ambil",
      errMsg: error,
    });
  }
};
