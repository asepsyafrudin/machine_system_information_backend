import express from "express";
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
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use("/static", express.static(path.join(__dirname, "src/assets")));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
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
app.listen(port, () => {
  console.log("Server Run On Port " + port);
});
