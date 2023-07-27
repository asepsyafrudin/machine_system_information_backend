import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

let transporter = nodemailer.createTransport({
  host: "172.24.46.52",
  port: 25,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

export const sendingEmail = async (toUserMail, subject, message, sender) => {
  let info = await transporter.sendMail({
    from: '"Prosysta Administrator" <asep.syafrudin.a5g@ap.denso.com>',
    to: toUserMail,
    subject: subject,
    html: `
        <div>
            Hello <br/>
            I am Prosysta, <br/>
            You Have Message From <b>${sender}</b>.<br/><br/>
    
            The Message is : <br/>
    
            ${message}
    
        </div>
    `,
  });

  console.log("Message sent: %s", info.messageId);
};

const projectList = (item, picId, projectId) => {
  const functionProject = () => {
    let array = "";
    for (let index = 0; index < item.length; index++) {
      array += `<tr>
          <td>${index + 1}</td>
          <td>${item[index]}</td>
          <td>${
            process.env.IP_ADDRESS_LOCALHOST
          }/redirectPage/projectActivity/${projectId}/${picId}</td>
        </tr>`;
    }

    return array;
  };

  return `
    <table>
      <thead>
        <tr>
          <td>No</td>
          <td>Project Name</td>
          <td>Link</td>
        </tr>
      </thead>
      <tbody>${functionProject()}</tbody>
    </table>`;
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const reminderProjectDelayToPic = async (
  toUserMail,
  subject,
  projectDelay,
  picId,
  projectId
) => {
  let info = await transporter.sendMail({
    from: '"Prosysta Administrator<No Reply>" <asep.syafrudin.a5g@ap.denso.com>',
    to: toUserMail,
    subject: subject,
    html: `
        <div>
            Hello Gaes <br/>
            I am Prosysta, <br/>
            I want to remind you that your project has been delayed.</br>
            Please update your progress and keep spirit gaes!!! <br/>
            
            Your Delay Project List : <br/>
            ${projectList(projectDelay, picId, projectId)}
            <br/><br/>
            <img src="cid:unique@kreata.ee"/>'
            Best Regard
            <br/><br/><br/>

            Prosysta Admin
        </div>
    `,
    attachments: [
      {
        filename: "image.png",
        path: path.join(__dirname, "../image/self reminder.jpg"),
        cid: "unique@kreata.ee", //same cid value as in the html img src
      },
    ],
  });

  console.log("Message sent: %s", info.messageId);
};
