import { sendTokenForChangePassword } from "../config/email.js";
import {
  createRequestModels,
  getRequestByToken,
  deleteRequestModels,
} from "../models/request.js";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

export const createRequest = async (req, res) => {
  try {
    const token = uuidv4();
    await createRequestModels(req.body, token);
    sendTokenForChangePassword(
      req.body.email,
      `${process.env.IP_ADDRESS_LOCALHOST}/${token}`
    );
    res.status(200).json({
      msg: "request berhasil di kirim",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "request gagal",
      errMsg: error,
    });
  }
};

export const getRequest = async (req, res) => {
  try {
    const result = (await getRequestByToken(req.params.token)).recordset;
    res.status(200).json({
      msg: "request berhasil di kirim",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "get request gagal",
      errMsg: error,
    });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    await deleteRequestModels(req.params.token);
    res.status(200).json({
      msg: "delete request berhasil di kirim",
      data: req.params.token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "delete request gagal",
      errMsg: error,
    });
  }
};
