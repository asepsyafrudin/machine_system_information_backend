import {
  createCommentModels,
  deleteCommentModels,
  getCommentBySelectedIdModels,
} from "../models/comment.js";
import { getDocumentByIdModels } from "../models/document.js";
import { getFeedbackByCommentId } from "../models/feedbackComment.js";
import { createNotificationModels } from "../models/notification.js";
import { getVideoByIdModels } from "../models/video.js";
import dotenv from "dotenv";

dotenv.config();

export const createComment = async (req, res) => {
  try {
    await createCommentModels(req.body);
    let newArrayListUserNotif = [];

    if (req.body.selected_item === "document") {
      const [document] = await getDocumentByIdModels(req.body.selected_id);
      newArrayListUserNotif.push({
        user_id: document[0].user_id,
        username: document[0].username,
        email: document[0].email,
      });
    } else if (req.body.selected_item === "video") {
      const [video] = await getVideoByIdModels(req.body.selected_id);
      newArrayListUserNotif.push({
        user_id: video[0].user_id,
        username: video[0].username,
        email: video[0].email,
      });
    }

    const [comment] = await getCommentBySelectedIdModels(req.body.selected_id);
    if (comment.length !== 0) {
      for (let index = 0; index < comment.length; index++) {
        newArrayListUserNotif.push({
          user_id: comment[index].user_id,
          username: comment[index].username,
          email: comment[index].email,
        });
      }
    }

    //array list for email notification (2x filter array)
    let arrayList1 = newArrayListUserNotif.filter((value, index) => {
      return (
        newArrayListUserNotif.findIndex(
          (newValue) => newValue.email === value.email
        ) === index
      );
    });

    let arrayList2 = arrayList1.filter(
      (value) => value.user_id !== req.body.user_id
    );
    // console.log(emailListPushNotif);
    //simulasi send notif email
    const port = process.env.IP_ADDRESS_LOCALHOST;

    if (req.body.selected_item === "document") {
      for (let index = 0; index < arrayList2.length; index++) {
        const data = {
          user_id: arrayList2[index].user_id,
          link: `${port}/document/${req.body.selected_id}`,
          type: "document",
          user_comment_id: req.body.user_id,
        };
        await createNotificationModels(data);
      }
    } else if (req.body.selected_item === "video") {
      for (let index = 0; index < arrayList2.length; index++) {
        const data = {
          user_id: arrayList2[index].user_id,
          link: `${port}/video/${req.body.selected_id}`,
          type: "video",
          user_comment_id: req.body.user_id,
        };
        await createNotificationModels(data);
      }
    }

    res.status(200).json({
      msg: "comment berhasil di post",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "comment gagal di post",
      errMsg: error,
    });
  }
};

export const getCommentBySelectedId = async (req, res) => {
  try {
    const [result] = await getCommentBySelectedIdModels(req.params.id);
    const page = req.params.page;
    const dataPerPage = 10;

    const totalPageData = Math.ceil(result.length / dataPerPage);
    let listData = [];
    for (
      let index = (page - 1) * dataPerPage;
      index < page * dataPerPage && index < result.length;
      index++
    ) {
      const [feedbackResult] = await getFeedbackByCommentId(result[index].id);
      listData.push({
        id: result[index].id,
        create_date: result[index].create_date,
        user_id: result[index].user_id,
        username: result[index].username,
        photo: result[index].photo,
        comment: result[index].comment,
        selected_id: result[index].selected_id,
        feedback: feedbackResult,
      });
    }

    res.status(200).json({
      msg: "comment berhasil di ambil",
      dataPerPage: dataPerPage,
      totalPageData: totalPageData,
      data: listData,
    });
  } catch (error) {
    res.status(400).json({
      msg: "comment berhasil di ambil",
      errMsg: error,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    await deleteCommentModels(req.params.id);
    res.status(200).json({
      msg: "comment berhasil di delete",
      data: req.params.id,
    });
  } catch (error) {
    res.status(400).json({
      msg: "comment berhasil di delete",
      errMsg: error,
    });
  }
};

export const getCommentBySelectedIdOnly = async (req, res) => {
  try {
    const [result] = await getCommentBySelectedIdModels(req.params.id);
    res.status(200).json({
      msg: "get data success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "get comment failed",
      errMsg: error,
    });
  }
};
