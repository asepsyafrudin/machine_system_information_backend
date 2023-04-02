import {
  createCommentModels,
  deleteCommentModels,
  getCommentByVideoIdModels,
} from "../models/comment.js";
import { getFeedbackByCommentId } from "../models/feedbackComment.js";
import { createNotificationModels } from "../models/notification.js";
import { getUserByUserIdModels } from "../models/user.js";
import { getVideoByIdModels } from "../models/video.js";

export const createComment = async (req, res) => {
  try {
    await createCommentModels(req.body);

    const [video] = await getVideoByIdModels(req.body.video_id);
    const [comment] = await getCommentByVideoIdModels(req.body.video_id);

    let newArrayListUserNotif = [];
    newArrayListUserNotif.push({
      user_id: video[0].user_id,
      username: video[0].username,
      email: video[0].email,
    });

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

export const getCommentByVideoId = async (req, res) => {
  try {
    const [result] = await getCommentByVideoIdModels(req.params.id);
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
        video_id: result[index].video_id,
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
