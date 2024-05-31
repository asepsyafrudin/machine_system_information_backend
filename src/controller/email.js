import {
  reminderProjectDelayToPic,
  reminderProjectWaitingActivityToPic,
  sendingEmail,
  sendingEmailForFeedback,
  shareFinishProjectCommon,
  shareFinishProjectForElectronicNewModel,
  sendNotificationToPicModel,
  sendDocumentApprovalModel,
} from "../config/email.js";
import { getActivityByActivityIdModels } from "../models/activity.js";
import {
  countGetAllProjectModels,
  getProjectByIdModels,
} from "../models/project.js";
import {
  getAllUsersModels,
  getUserByUserIdModels,
  getUserByNPKModels,
} from "../models/user.js";
import { getDataResult } from "./project.js";
import { getProblemByIdModels } from "../models/problem.js";
import dotenv from "dotenv";
import { getDataManagerListModels } from "../models/approval.js";
import { v4 as uuidv4 } from "uuid";
import { createDocumentModels } from "../models/document.js";
import { createFilesModels } from "../models/file.js";
import { log } from "../config/logConfig.js";

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
  const user = (await getUserByUserIdModels(id)).recordset;
  return user;
};

const managerFunction = async (npk) => {
  const manager = (await getUserByNPKModels(npk)).recordset;
  return manager;
};

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
  const result = (await countGetAllProjectModels()).recordset;
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
          project_id: [projectDelayList[index].id],
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
            project_id: [
              ...checkUserListEmail.project_id,
              projectDelayList[index].id,
            ],
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
    const getDataManagerList = (await getDataManagerListModels()).recordset;

    const listDataManagerAndProduct = [];
    if (getDataManagerList.length > 0) {
      for (let index = 0; index < getDataManagerList.length; index++) {
        listDataManagerAndProduct.push({
          ...getDataManagerList[index],
          product_id: getDataManagerList[index].product_id.split(","),
        });
      }
    }

    const userListToEmail = await getProjectDelayFunction();
    let contentEmail = [];
    let subject = "Delay Project Reminder From Prosysta";
    if (userListToEmail.length > 0) {
      for (let index = 0; index < userListToEmail.length; index++) {
        const userObject = await userFunction(
          userListToEmail[index].manager_id
        );
        const picEmail = userObject[0].email;

        let idProductPic = userObject[0].product_id;

        let bosId = "";
        if (listDataManagerAndProduct.length > 0) {
          for (
            let index = 0;
            index < listDataManagerAndProduct.length;
            index++
          ) {
            let check = listDataManagerAndProduct[index].product_id.find(
              (value) => parseInt(value) === parseInt(idProductPic)
            );
            if (check) {
              bosId = listDataManagerAndProduct[index].manager_id;
            }
          }
        }
        contentEmail.push({
          bos_id: bosId,
          pic_id: userListToEmail[index].manager_id,
          product_id: userObject[0].product_id,
          pic: picEmail,
          project_delay: userListToEmail[index].project_delay,
          project_id: userListToEmail[index].project_id,
        });
      }
      // reminder manager
      let groupDataBaseOnBosId = [];
      if (contentEmail.length > 0) {
        for (let index = 0; index < contentEmail.length; index++) {
          const checkData = groupDataBaseOnBosId.find(
            (value) => value.bos_id === contentEmail[index].bos_id
          );
          if (checkData) {
            for (
              let index2 = 0;
              index2 < groupDataBaseOnBosId.length;
              index2++
            ) {
              if (
                groupDataBaseOnBosId[index2].bos_id ===
                contentEmail[index].bos_id
              ) {
                groupDataBaseOnBosId[index2].project_delay = [
                  ...groupDataBaseOnBosId[index2].project_delay,
                  ...contentEmail[index].project_delay,
                ];
                groupDataBaseOnBosId[index2].project_id = [
                  ...groupDataBaseOnBosId[index2].project_id,
                  ...contentEmail[index].project_id,
                ];
              }
            }
          } else {
            groupDataBaseOnBosId.push(contentEmail[index]);
          }
        }
      }

      // reminder manager
      for (let index = 0; index < groupDataBaseOnBosId.length; index++) {
        const bosId = groupDataBaseOnBosId[index].bos_id;
        const bosObject = await managerFunction(bosId);
        groupDataBaseOnBosId[index] = {
          ...groupDataBaseOnBosId[index],
          ...bosObject[0],
        };
      }

      // reminder manager

      for (let index = 0; index < groupDataBaseOnBosId.length; index++) {
        reminderProjectDelayToPic(
          groupDataBaseOnBosId[index].email,
          subject,
          groupDataBaseOnBosId[index].project_delay,
          groupDataBaseOnBosId[index].bos_id,
          groupDataBaseOnBosId[index].project_id
        );
      }

      // reminder pic

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
  } catch (error) {
    log.error(error);
  }
};

const getProjectWaitingActivityFunction = async () => {
  const result = (await countGetAllProjectModels()).recordset;

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
          project_id: [projectWaitingActivity[index].id],
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
            project_id: [
              ...checkUserListEmail.project_id,
              projectWaitingActivity[index].id,
            ],
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
          product_id: userObject[0].product_id,
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
    log.error(error);
  }
};

//Waiting Email Role :
export const reminderNotificationDelayToManager = async () => {
  try {
    const userListToEmail = await getProjectDelayFunction();
    const user = (await getAllUsersModels()).recordset;
    let contentEmail = [];
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
      for (let index = 0; index < emailListToManager.length; index++) {}
    }
  } catch (error) {
    log.error(error);
  }
};

// reminderNotificationDelayToManager();

export const sendFeedback = async (req, res) => {
  try {
    const problem_id = req.body.problem_id;
    const userFeedback = req.body.user_id;
    const dataProblem = (await getProblemByIdModels(problem_id)).recordset;
    const { user_id, problem_name } = dataProblem[0];
    const user = (await getUserByUserIdModels(user_id)).recordset;
    const sender = (await getUserByUserIdModels(userFeedback)).recordset;
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
    const project = (await getProjectByIdModels(project_id)).recordset;
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
    const { project_id, toEmail, ccEmail } = req.body;
    const project = (await getProjectByIdModels(project_id)).recordset;
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

    const user = await userFunction(project[0].manager_id);
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

// notif pic
export const sendNotificationToPic = async (req, res) => {
  try {
    const { project_id, picEmail, activity_id } = req.body;
    const project = (await getProjectByIdModels(project_id)).recordset;
    const activity = (await getActivityByActivityIdModels(activity_id))
      .recordset;
    const subject = `New activity added on ${project[0].project_name}`;
    const linkProject = `${process.env.IP_ADDRESS_LOCALHOST}/redirectPage/login/${project_id}`;

    sendNotificationToPicModel(
      picEmail,
      subject,
      capitalCaseFirstWord(project[0].project_name),
      capitalCaseFirstWord(activity[0].name),
      linkProject
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

export const approvalManagerFileReport = async (req, res) => {
  try {
    const id = uuidv4();
    await createDocumentModels(req.body, id);
    const file = req.files;
    const product_id_document = req.body.product_id;
    const document_id = id;

    const subject = `Your team has upload new Document Engineering Report`;
    if (file.length > 0) {
      for (let index = 0; index < file.length; index++) {
        let filename =
          req.protocol +
          "://" +
          req.get("host") +
          "/static/files/" +
          file[index].filename;
        await createFilesModels(document_id, filename, file[index].filename);
      }

      let managerApproval = "";
      const getDataManagerList = (await getDataManagerListModels()).recordset;
      if (getDataManagerList.length > 0) {
        for (let index = 0; index < getDataManagerList.length; index++) {
          getDataManagerList[index].product_id =
            getDataManagerList[index].product_id.split(",");
        }

        for (let index = 0; index < getDataManagerList.length; index++) {
          for (
            let index2 = 0;
            index2 < getDataManagerList[index].product_id.length;
            index2++
          ) {
            if (
              parseInt(getDataManagerList[index].product_id[index2]) ===
              parseInt(product_id_document)
            ) {
              managerApproval = getDataManagerList[index].manager_id;
              break;
            }
          }
        }
      }

      const manager = await managerFunction(managerApproval);
      const managerEmail = manager[0].email;
      const user = await managerFunction(managerApproval);
      const userId = user[0].id;
      const linkDocument = `${process.env.IP_ADDRESS_LOCALHOST}/redirectPage/document/${document_id}/${userId}`;

      sendDocumentApprovalModel(managerEmail, subject, linkDocument);
      res.status(200).json({
        msg: "Submit Data Document dan File Berhasil",
        data: req.body,
      });
    } else {
      res.status(200).json({
        msg: "Submit Data Document Berhasil",
        data: req.body,
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "Submit Data Gagal",
      errMsg: error,
    });
  }
};
