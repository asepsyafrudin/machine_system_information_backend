import {
  changeStatusNotifToReadModels,
  createNotificationModels,
  getNotificationByUserIdModels,
} from "../models/notification.js";

export const createNotification = async (req, res) => {
  try {
    await createNotificationModels(req.body);
    res.status(200).json({
      msg: "Berhasil create notif",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Gagal",
      errMsg: error,
    });
  }
};

export const getNotificationByUserId = async (req, res) => {
  try {
    const result = (await getNotificationByUserIdModels(req.params.userId)).recordset;
    res.status(200).json({
      msg: "Berhasil create notif",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Gagal",
      errMsg: error,
    });
  }
};

export const changeStatusNotifToRead = async (req, res) => {
  try {
    await changeStatusNotifToReadModels(req.params.id);
    res.status(200).json({
      msg: "Berhasil create notif",
      data: req.params.id,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Gagal",
      errMsg: error,
    });
  }
};
