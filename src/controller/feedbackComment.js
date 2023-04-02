import { getCommentByCommentId } from "../models/comment.js";
import {
  createFeedbackModels,
  deleteFeedbackModels,
  getFeedbackByCommentId,
} from "../models/feedbackComment.js";
import { createNotificationModels } from "../models/notification.js";
import { getVideoByIdModels } from "../models/video.js";

export const createFeedbackComment = async (req, res) => {
  try {
    await createFeedbackModels(req.body);
    console.log(req.body);
    const [feedbackComment] = await getFeedbackByCommentId(req.body.comment_id);
    const [comment] = await getCommentByCommentId(req.body.comment_id);
    const [video] = await getVideoByIdModels(req.body.video_id);

    let newArrayListUserNotif = [];
    newArrayListUserNotif.push({
      user_id: comment[0].user_id,
      username: comment[0].username,
      email: comment[0].email,
      video_id: comment[0].video_id,
    });

    newArrayListUserNotif.push({
      user_id: video[0].user_id,
      username: video[0].username,
      email: video[0].email,
      video_id: video[0].id,
    });

    if (feedbackComment.length !== 0) {
      for (let index = 0; index < feedbackComment.length; index++) {
        newArrayListUserNotif.push({
          user_id: feedbackComment[index].user_id,
          username: feedbackComment[index].username,
          email: feedbackComment[index].email,
          video_id: feedbackComment[index].video_id,
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

    const port = "http://172.31.73.34:3000";
    for (let index = 0; index < arrayList2.length; index++) {
      const data = {
        user_id: arrayList2[index].user_id,
        link: `${port}/video/${video[0].id}`,
        type: "video",
        user_comment_id: req.body.user_id,
      };
      await createNotificationModels(data);
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
