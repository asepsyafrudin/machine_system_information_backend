import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendingEmail = async (toUserMail, subject, message, sender) => {
  let transporter = nodemailer.createTransport({
    host: "172.24.46.52",
    port: 25,
    secure: false,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"Prosysta Administrator" <asep.syafrudin.a5g@ap.denso.com>',
    to: toUserMail,
    subject: subject,
    html: `
        <div>
            Hello <br/>
            This is From Prosysta, <br/>
            You Have Message From <b>${sender}</b>.<br/><br/>
    
            The Message is : <br/>
    
            ${message}
    
        </div>
    `,
  });

  console.log("Message sent: %s", info.messageId);
};
