import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendingEmail = async (toUserMail, subject, message) => {
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
    subject: subject,
    html: message,
  });

  console.log("Message sent: %s", info.messageId);
};
