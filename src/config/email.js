import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendingEmail = async (toUserMail, message) => {
  let transporter = nodemailer.createTransport({
    host: "",
    port: "",
    secure: "",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"Asep" <asep.syafrudin.a5g@ap.denso.com>',
    to: toUserMail,
    subject: "Presysta Notification",
    text: message,
  });

  console.log("Message sent: %s", info.messageId);
};
