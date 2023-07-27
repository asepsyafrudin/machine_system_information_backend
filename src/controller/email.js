import { reminderProjectDelayToPic, sendingEmail } from "../config/email.js";
import { getActivityByProjectIdModels } from "../models/activity.js";
import {
  countGetAllProjectModels,
  getProjectByIdModels,
} from "../models/project.js";
import { getAllUsersModels, getUserByUserIdModels } from "../models/user.js";
import { getDataResult } from "./project.js";
import { getAllUser } from "./user.js";

function capitalCaseFirstWord(word) {
  if (word) {
    let newWord = word
      .split(" ")
      .map((arr) => arr.charAt(0).toUpperCase() + arr.slice(1))
      .join(" ");

    return newWord;
  } else {
    return "";
  }
}

const userFunction = async (id) => {
  const [user] = await getUserByUserIdModels(id);
  return user;
};

const reminderDate = "7:30:00 AM";

export const sendEmail = async (req, res) => {
  const { sender, toEmail, subject, message } = req.body;
  try {
    const senderName = await userFunction(sender);
    const toEmailList = [];
    if (toEmail.length > 0) {
      for (let index = 0; index < toEmail.length; index++) {
        const user = await userFunction(toEmail[index]);
        toEmailList.push(user[0].email);
      }
    }

    sendingEmail(
      toEmailList,
      subject,
      message,
      capitalCaseFirstWord(senderName[0].username)
    );

    res.status(200).json({
      msg: "Submit Data Document Berhasil",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Submit Data Gagal",
      errMsg: error,
    });
  }
};

const getProjectDelayFunction = async () => {
  const [result] = await countGetAllProjectModels();
  let notCryteria = [
    "Not Yet Started",
    "On Progress",
    "Finish",
    "Waiting Detail Activity",
    "cancel",
  ];

  let projectDelayList = [];
  if (result.length > 0) {
    const resultSubmit = await getDataResult(result);
    if (resultSubmit.length > 0) {
      for (let index = 0; index < resultSubmit.length; index++) {
        const check = notCryteria.find(
          (value) => value === resultSubmit[index].status
        );
        if (!check) {
          projectDelayList.push(resultSubmit[index]);
        }
      }
    }
  }

  let userListToEmail = [];
  if (projectDelayList.length > 0) {
    for (let index = 0; index < projectDelayList.length; index++) {
      const checkUserListEmail = userListToEmail.find(
        (value) => value.manager_id === projectDelayList[index].manager_id
      );

      if (!checkUserListEmail) {
        userListToEmail.push({
          manager_id: projectDelayList[index].manager_id,
          project_delay: [projectDelayList[index].project_name],
          project_id: projectDelayList[index].id,
        });
      } else {
        const removeData = userListToEmail.filter(
          (value) => value.manager_id !== projectDelayList[index].manager_id
        );
        const newSetData = [
          ...removeData,
          {
            manager_id: projectDelayList[index].manager_id,
            project_delay: [
              ...checkUserListEmail.project_delay,
              projectDelayList[index].project_name,
            ],
            project_id: projectDelayList[index].id,
          },
        ];
        userListToEmail = newSetData;
      }
    }
  }
  return userListToEmail;
};

export const reminderNotificationDelaytoPic = async () => {
  try {
    const date = new Date();
    const userListToEmail = await getProjectDelayFunction();
    let contentEmail = [];
    let subject = "Delay Project Reminder From Prosysta";
    if (userListToEmail.length > 0) {
      for (let index = 0; index < userListToEmail.length; index++) {
        const userObject = await userFunction(
          userListToEmail[index].manager_id
        );
        const picEmail = userObject[0].email;

        contentEmail.push({
          pic_id: userListToEmail[index].manager_id,
          pic: picEmail,
          project_delay: userListToEmail[index].project_delay,
          project_id: userListToEmail[index].project_id,
        });
      }

      console.log(date.toLocaleTimeString());
      if (date.toLocaleTimeString() === reminderDate) {
        for (let index = 0; index < contentEmail.length; index++) {
          reminderProjectDelayToPic(
            contentEmail[index].pic,
            subject,
            contentEmail[index].project_delay,
            contentEmail[index].pic_id,
            contentEmail[index].project_id
          );
        }
      }
    }

    // console.log(date.toLocaleTimeString() === reminderDate);
  } catch (error) {
    console.log(error);
  }
};

export const reminderNotificationDelayToManager = async () => {
  try {
    const userListToEmail = await getProjectDelayFunction();
    const [user] = await getAllUsersModels();
    let contentEmail = [];
    let subject = "Delay Project Reminder From Prosysta";
    if (userListToEmail.length > 0) {
      for (let index = 0; index < userListToEmail.length; index++) {
        const userObject = await userFunction(
          userListToEmail[index].manager_id
        );
        const picEmail = userObject[0].email;

        contentEmail.push({
          pic_id: userListToEmail[index].manager_id,
          pic: picEmail,
          project_delay: userListToEmail[index].project_delay,
          project_id: userListToEmail[index].project_id,
        });
      }
    }

    let emailListToManager = [];

    if (contentEmail.length > 0) {
      for (let index = 0; index < contentEmail.length; index++) {
        const pic = await userFunction(contentEmail[index].pic_id);
        const manager = user.filter(
          (value) =>
            value.product_id === pic[0].product_id &&
            value.position === "Manager"
        );

        if (manager.length > 0) {
          for (let index2 = 0; index2 < manager.length; index2++) {
            const checkEmailListToManager = emailListToManager.find(
              (value) => value.manager_id === manager[index2].user_id
            );
            if (!checkEmailListToManager) {
              emailListToManager.push({
                manager_id: manager[index2].id,
                project_delay: contentEmail[index].project_delay,
                project_id: contentEmail[index].project_id,
              });
            } else {
              const removeData = emailListToManager.filter(
                (value) => value.manager_id !== manager[index2].id
              );
              const newSetData = [
                ...removeData,
                {
                  manager_id: manager[index2].id,
                  project_delay: [
                    ...checkEmailListToManager.project_delay,
                    contentEmail[index].project_delay,
                  ],
                  project_id: contentEmail[index].project_id,
                },
              ];
              emailListToManager = newSetData;
            }
          }
        }
      }
    }

    if (emailListToManager.length > 0) {
      for (let index = 0; index < emailListToManager.length; index++) {
        const [activityData] = await getActivityByProjectIdModels(
          emailListToManager[index].project_id
        );
        console.log(activityData);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// reminderNotificationDelayToManager();
