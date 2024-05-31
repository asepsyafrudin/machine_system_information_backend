import express from "express";
import http from "http";
import userRoute from "./src/routes/user.js";
import loginRoute from "./src/routes/login.js";
import productRoute from "./src/routes/product.js";
import lineRoute from "./src/routes/line.js";
import machineRoute from "./src/routes/machine.js";
import videoRoute from "./src/routes/video.js";
import commentRoute from "./src/routes/comment.js";
import documentRoute from "./src/routes/document.js";
import fileRoute from "./src/routes/file.js";
import feedbackCommentRoute from "./src/routes/feedbackComment.js";
import notificationRoute from "./src/routes/notification.js";
import openaiRoute from "./src/routes/openai.js";
import requestRoute from "./src/routes/request.js";
import capabilityRoute from "./src/routes/capability.js";
import fileUploadGeneralRoute from "./src/routes/fileUpload.js";
import allItemRoute from "./src/routes/allItem.js";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import emailRoute from "./src/routes/email.js";
import problemRoute from "./src/routes/problem.js";
import ftaLv1Route from "./src/routes/ftaLv1.js";
import ftaLv2route from "./src/routes/ftaLv2.js";
import projectRoute from "./src/routes/project.js";
import actvityRoute from "./src/routes/activity.js";
import todoRoute from "./src/routes/todo.js";
import tokenRoute from "./src/routes/token.js";
import sectionRoute from "./src/routes/section.js";
import {
  reminderNotificationDelaytoPic,
  reminderNotificationWaitingtoPic,
} from "./src/controller/email.js";
import settingRoute from "./src/routes/setting.js";
import patternRoute from "./src/routes/pattern.js";
import patternActivityRoute from "./src/routes/pattern_activity.js";
import { log } from "./src/config/logConfig.js";
import compression from "compression";
dotenv.config();

http.globalAgent.maxSockets = Infinity;

const app = express();
const server = http.createServer(app);

app.use(compression());
const port = process.env.PORT;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use("/static", express.static(path.join(__dirname, "../assets")));
app.use(express.static(path.join(__dirname, "./public"), { maxAge: 31557600 }));

const reminderDate = "7:30:00 AM";

setInterval(() => {
  const date = new Date();
  if (date.toLocaleTimeString() === reminderDate && date.getDay() < 6) {
    reminderNotificationDelaytoPic();
    reminderNotificationWaitingtoPic();
  }
}, 1000);

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api/token", tokenRoute);
app.use("/api/video", videoRoute);
app.use("/api/users", userRoute);
app.use("/login", loginRoute);
app.use("/api/product", productRoute);
app.use("/api/line", lineRoute);
app.use("/api/machine", machineRoute);
app.use("/api/comment", commentRoute);
app.use("/api/document", documentRoute);
app.use("/api/file", fileRoute);
app.use("/api/feedback", feedbackCommentRoute);
app.use("/api/notification", notificationRoute);
app.use("/api/openai", openaiRoute);
app.use("/api/request", requestRoute);
app.use("/api/capability", capabilityRoute);
app.use("/api/allItem", allItemRoute);
app.use("/api/problem", problemRoute);
app.use("/api/ftaLv1", ftaLv1Route);
app.use("/api/ftaLv2", ftaLv2route);
app.use("/api/activity", actvityRoute);
app.use("/api/fileUpload", fileUploadGeneralRoute);
app.use("/api/project", projectRoute);
app.use("/api/todo", todoRoute);
app.use("/api/section", sectionRoute);
app.use("/api/email", emailRoute);
app.use("/api/setting", settingRoute);
app.use("/api/pattern", patternRoute);
app.use("/api/patternActivity", patternActivityRoute);

app.use("/prosysta", (req, res) => {
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

server.listen(port, () => {
  log.info("Server Already Run On Port " + port);
});
