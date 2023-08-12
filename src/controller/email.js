import moment from "moment";
import {
  reminderProjectDelayToPic,
  reminderProjectWaitingActivityToPic,
  sendingEmail,
  sendingEmailForFeedback,
  shareFinishProjectCommon,
  shareFinishProjectForElectronicNewModel,
} from "../config/email.js";
import { getActivityByProjectIdModels } from "../models/activity.js";
import {
  countGetAllProjectModels,
  getProjectByIdModels,
} from "../models/project.js";
import { getAllUsersModels, getUserByUserIdModels } from "../models/user.js";
import { getDataResult } from "./project.js";
import { getProblemByIdModels } from "../models/problem.js";
import dotenv from "dotenv";

dotenv.config();
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

const reminderDate = "07:30:00";

export const sendEmail = async (req, res) => {
  const { sender, toEmail, subject, message, ccEmail, project_id } = req.body;
  try {
    const linkProject = `${process.env.IP_ADDRESS_LOCALHOST}/redirectPage/login/${project_id}`;
    const senderName = await userFunction(sender);
    let toEmailList = [];
    if (toEmail.length > 0) {
      for (let index = 0; index < toEmail.length; index++) {
        const user = await userFunction(toEmail[index]);
        toEmailList.push(user[0].email);
      }
    }

    let ccEmailList = [];
    if (ccEmail.length > 0) {
      for (let index = 0; index < ccEmail.length; index++) {
        const user = await userFunction(ccEmail[index]);
        ccEmailList.push(user[0].email);
      }
    }

    sendingEmail(
      toEmailList,
      subject,
      message,
      capitalCaseFirstWord(senderName[0].username),
      ccEmailList,
      senderName[0].email,
      linkProject
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

      if (date.toLocaleTimeString() === reminderDate && date.getDay() < 6) {
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
  } catch (error) {
    console.log(error);
  }
};

const getProjectWaitingActivityFunction = async () => {
  const [result] = await countGetAllProjectModels();

  let projectWaitingActivity = [];
  if (result.length > 0) {
    const resultSubmit = await getDataResult(result);
    if (resultSubmit.length > 0) {
      for (let index = 0; index < resultSubmit.length; index++) {
        if (resultSubmit[index].status === "Waiting Detail Activity") {
          projectWaitingActivity.push(resultSubmit[index]);
        }
      }
    }
  }

  let userListToEmail = [];
  if (projectWaitingActivity.length > 0) {
    for (let index = 0; index < projectWaitingActivity.length; index++) {
      const checkUserListEmail = userListToEmail.find(
        (value) => value.manager_id === projectWaitingActivity[index].manager_id
      );

      if (!checkUserListEmail) {
        userListToEmail.push({
          manager_id: projectWaitingActivity[index].manager_id,
          project_waiting: [projectWaitingActivity[index].project_name],
          project_id: projectWaitingActivity[index].id,
        });
      } else {
        const removeData = userListToEmail.filter(
          (value) =>
            value.manager_id !== projectWaitingActivity[index].manager_id
        );
        const newSetData = [
          ...removeData,
          {
            manager_id: projectWaitingActivity[index].manager_id,
            project_waiting: [
              ...checkUserListEmail.project_waiting,
              projectWaitingActivity[index].project_name,
            ],
            project_id: projectWaitingActivity[index].id,
          },
        ];
        userListToEmail = newSetData;
      }
    }
  }
  return userListToEmail;
};

export const reminderNotificationWaitingtoPic = async () => {
  try {
    const date = new Date();
    const userListToEmail = await getProjectWaitingActivityFunction();
    let contentEmail = [];
    let subject = "Waiting Detail Actiivity Project Reminder From Prosysta";
    if (userListToEmail.length > 0) {
      for (let index = 0; index < userListToEmail.length; index++) {
        const userObject = await userFunction(
          userListToEmail[index].manager_id
        );
        const picEmail = userObject[0].email;

        contentEmail.push({
          pic_id: userListToEmail[index].manager_id,
          pic: picEmail,
          project_waiting: userListToEmail[index].project_waiting,
          project_id: userListToEmail[index].project_id,
        });
      }

      if (date.toLocaleTimeString() === reminderDate && date.getDay() < 6) {
        for (let index = 0; index < contentEmail.length; index++) {
          reminderProjectWaitingActivityToPic(
            contentEmail[index].pic,
            subject,
            contentEmail[index].project_waiting,
            contentEmail[index].pic_id,
            contentEmail[index].project_id
          );
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const statusFunction = (
  arrayDataActivity,
  startDate,
  SOPDate,
  progress,
  status
) => {
  let totalActivityDelay = 0;
  let currentDate = new Date();
  let start = new Date(startDate);
  currentDate.setDate(currentDate.getDate() - 1);

  if (status !== "cancel") {
    if (arrayDataActivity.length > 0) {
      if (progress) {
        if (progress === 100) {
          return "Finish";
        } else if (start - currentDate > 0) {
          return "Not Yet Started";
        } else {
          for (let index = 0; index < arrayDataActivity.length; index++) {
            let endDateActivity = new Date(
              moment(arrayDataActivity[index].finish)
            );

            if (
              currentDate - endDateActivity > 0 &&
              parseInt(arrayDataActivity[index].progress) < 100
            ) {
              totalActivityDelay += 1;
            }
          }
          if (totalActivityDelay === 0) {
            return "On Progress";
          } else {
            return `${totalActivityDelay} Activity Delay`;
          }
        }
      } else {
        return "Waiting Detail Activity";
      }
    } else {
      return "Waiting Detail Activity";
    }
  } else {
    return "cancel";
  }
};

//Waiting Email Role :
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
                pic_id: contentEmail[index].pic_id,
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
                  pic_id: contentEmail[index].pic_id,
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
        const date = new Date();
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// reminderNotificationDelayToManager();

export const sendFeedback = async (req, res) => {
  try {
    const problem_id = req.body.problem_id;
    const userFeedback = req.body.user_id;
    const [dataProblem] = await getProblemByIdModels(problem_id);
    const { user_id, problem_name } = dataProblem[0];
    const [user] = await getUserByUserIdModels(user_id);
    const [sender] = await getUserByUserIdModels(userFeedback);
    const message = req.body.message;

    sendingEmailForFeedback(
      user[0].email,
      problem_name,
      message,
      capitalCaseFirstWord(sender[0].username, sender[0].email)
    );

    res.status(200).json({
      msg: "send email berhasil",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "send email gagal",
      errMsg: error,
    });
  }
};

export const shareFinishProjectForElctronictSMDNewModel = async (req, res) => {
  try {
    const { project_id, toEmail, ccEmail, user_id } = req.body;
    const [project] = await getProjectByIdModels(project_id);
    const subject = `Project Finish Notification of ${project[0].project_name}`;
    const linkProject = `${process.env.IP_ADDRESS_LOCALHOST}/redirectPage/login/${project_id}`;
    let toEmailList = [];
    if (toEmail.length > 0) {
      for (let index = 0; index < toEmail.length; index++) {
        const user = await userFunction(toEmail[index]);
        toEmailList.push(user[0].email);
      }
    }

    let ccEmailList = [];
    if (ccEmail.length > 0) {
      for (let index = 0; index < ccEmail.length; index++) {
        const user = await userFunction(ccEmail[index]);
        ccEmailList.push(user[0].email);
      }
    }

    const user = await userFunction(user_id);
    shareFinishProjectForElectronicNewModel(
      toEmailList,
      ccEmailList,
      subject,
      capitalCaseFirstWord(project[0].project_name),
      linkProject,
      capitalCaseFirstWord(user[0].username)
    );

    res.status(200).json({
      msg: "send email success",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "send email failed",
      errMsg: error,
    });
  }
};

export const shareFinishProjectForCommon = async (req, res) => {
  try {
    const { project_id, toEmail, ccEmail, user_id } = req.body;
    const [project] = await getProjectByIdModels(project_id);
    const subject = `Project Finish Notification of ${project[0].project_name}`;
    const linkProject = `${process.env.IP_ADDRESS_LOCALHOST}/redirectPage/login/${project_id}`;

    let toEmailList = [];
    if (toEmail.length > 0) {
      for (let index = 0; index < toEmail.length; index++) {
        const user = await userFunction(toEmail[index]);
        toEmailList.push(user[0].email);
      }
    }

    let ccEmailList = [];
    if (ccEmail.length > 0) {
      for (let index = 0; index < ccEmail.length; index++) {
        const user = await userFunction(ccEmail[index]);
        ccEmailList.push(user[0].email);
      }
    }

    const user = await userFunction(user_id);
    shareFinishProjectCommon(
      toEmailList,
      ccEmailList,
      subject,
      capitalCaseFirstWord(project[0].project_name),
      linkProject,
      capitalCaseFirstWord(user[0].username)
    );

    res.status(200).json({
      msg: "send email success",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      msg: "send email failed",
      errMsg: error,
    });
  }
};
