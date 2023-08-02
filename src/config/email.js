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

export const sendingEmail = async (
  toUserMail,
  subject,
  message,
  senderName,
  ccMail,
  senderEmail
) => {
  let info = await transporter.sendMail({
    from: '"Prosysta Administrator<No Reply>" <asep.syafrudin.a5g@ap.denso.com>',
    to: toUserMail,
    cc: ccMail,
    subject: subject,
    html: `
        <div>
            Hello <br/>
            I am Prosysta, <br/>
            You Have Message From <b>${senderName} - ${senderEmail}</b>.<br/><br/>
    
            The Message is : <br/>
    
            ${message}
    

            <br/>
            <br/>
            Best Regard

            <br/><br/>
            Prosysta Admin
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

export const sendTokenForChangePassword = async (toUserMail, link) => {
  let info = await transporter.sendMail({
    from: '"Prosysta Administrator<No Reply>" <asep.syafrudin.a5g@ap.denso.com>',
    to: toUserMail,
    subject: "Reset Password Prosysta",
    html: `
          <div>
              Hello <br/>
              I am Prosysta, <br/>
              Here's is Link to Reset Your Password <br/>
              ${link}

              <br/>
              <br/>
              Best Regard
              <br/><br/>
              Prosysta Admin
          </div>
      `,
  });

  console.log("Message sent: %s", info.messageId);
};

export const sendingEmailForFeedback = async (
  toUserMail,
  problemName,
  message,
  sender,
  senderEmail
) => {
  let info = await transporter.sendMail({
    from: '"Prosysta Administrator<No Reply>" <asep.syafrudin.a5g@ap.denso.com>',
    to: toUserMail,
    cc: senderEmail,
    subject: `Feedback FTA about ${problemName}`,
    html: `
        <div>
            Hello <br/>
            I am Prosysta, <br/>
            You Have Message From <b>${sender}</b>.<br/><br/>
    
            The Message is : <br/>
    
            ${message}
            <br/>
            <br/>
            Best Regard

            <br/><br/>
            Prosysta Admin
        </div>
    `,
  });

  console.log("Message sent: %s", info.messageId);
};

export const shareFinishProjectForElectronicNewModel = async (
  toUserMail,
  ccMail,
  subject,
  projectTitle,
  projectLink,
  pic
) => {
  let info = await transporter.sendMail({
    from: '"Prosysta Administrator<No Reply>" <asep.syafrudin.a5g@ap.denso.com>',
    to: toUserMail,
    cc: ccMail,
    subject: subject,
    html: `
        <div>
        Dear PE Final Assy Electronic,<br/>
        cc: Manager Up <br/>
        <br/><br/>
         
        
        We would like to inform you Circuit Assy sample already finished. <br/>
        "<a href='${projectLink}'>${projectTitle}</a>" --> please Login at Prosysta App & click for detail <br/>
        Please proceed continue making sample at Final Assy line following New Model schedule <br/>
        <br/>
        <br/>
        <br/>
        
        Best Regards, 
        <br/> <br/> <br/>
         
        
        PROSYSTA administrator <br/>
        If you have any concern or confirmation please contact to PIC project (${pic} - PE SMD)
          
        </div>
    `,
  });

  console.log("Message sent: %s", info.messageId);
};

export const shareFinishProjectCommon = async (
  toUserMail,
  ccMail,
  subject,
  projectTitle,
  projectLink,
  pic
) => {
  let info = await transporter.sendMail({
    from: '"Prosysta Administrator<No Reply>" <asep.syafrudin.a5g@ap.denso.com>',
    to: toUserMail,
    cc: ccMail,
    subject: subject,
    html: `
        <div>
        Dear All,<br/>
        <br/><br/>
         
        
        We would like to inform you that our project already finished. <br/>
        "<a href='${projectLink}'>${projectTitle}</a>" --> click for detail <br/>
        Thank you very much for your effort. <br/>
        <br/>
        <br/>
        <br/>
        
        Best Regards, 
        <br/> <br/> <br/>
         
        
        PROSYSTA administrator <br/>
        If you have any concern or confirmation please contact to PIC project (${pic} - PE SMD)
          
        </div>
    `,
  });

  console.log("Message sent: %s", info.messageId);
};
