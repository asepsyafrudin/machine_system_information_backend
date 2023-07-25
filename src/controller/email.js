import { sendingEmail } from "../config/email.js";
import { getUserByUserIdModels } from "../models/user.js";

export const sendEmail = async (req, res) => {
  const { sender, toEmail, subject, message } = req.body;
  try {
    const userFunction = async (id) => {
      const [user] = await getUserByUserIdModels(id);
      return user;
    };

    const senderName = await userFunction(sender);
    const toEmailList = [];
    if (toEmail.length > 0) {
      for (let index = 0; index < toEmail.length; index++) {
        const user = await userFunction(toEmail[index]);
        toEmailList.push(user[0]);
      }
    }

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

    if (toEmailList.length > 0) {
      for (let index = 0; index < toEmailList.length; index++) {
        sendingEmail(
          toEmailList[index].email,
          subject,
          message,
          capitalCaseFirstWord(senderName[0].username)
        );
      }
    }

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
