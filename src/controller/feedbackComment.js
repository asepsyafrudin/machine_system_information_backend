import { getCommentByCommentId } from "../models/comment.js";
import { getDocumentByIdModels } from "../models/document.js";
import {
  createFeedbackModels,
  deleteFeedbackModels,
  getFeedbackByCommentId,
  getFeedbackByIdModels,
} from "../models/feedbackComment.js";
import dotenv from "dotenv";
import { createNotificationModels } from "../models/notification.js";
import { getVideoByIdModels } from "../models/video.js";

dotenv.config();

export const createFeedbackComment = async (req, res) => {
  try {
    await createFeedbackModels(req.body);
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

    const [comment] = await getCommentByCommentId(req.body.comment_id);
    newArrayListUserNotif.push({
      user_id: comment[0].user_id,
      username: comment[0].username,
      email: comment[0].email,
    });

    const [feedbackComment] = await getFeedbackByCommentId(req.body.comment_id);
    if (feedbackComment.length !== 0) {
      for (let index = 0; index < feedbackComment.length; index++) {
        newArrayListUserNotif.push({
          user_id: feedbackComment[index].user_id,
          username: feedbackComment[index].username,
          email: feedbackComment[index].email,
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

export const deleteFeedback = async (req, res) => {
  try {
    await deleteFeedbackModels(req.params.id);
    res.status(200).json({
      msg: "comment berhasil di post",
      data: req.params.id,
    });
  } catch (error) {
    res.status(400).json({
      msg: "comment gagal di post",
      errMsg: error,
    });
  }
};

export const getFeedbackById = async (req, res) => {
  try {
    const [result] = await getFeedbackByIdModels(req.params.id);
    res.status(200).json({
      msg: "get data berhasil",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "get data gagal",
      errMsg: error,
    });
  }
};
