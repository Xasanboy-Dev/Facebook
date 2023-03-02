import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;

import express from "express";

import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 1234 });

wss.on("connection", (ws) => {
  ws.on("message", (data: any) => {
    let user: { name: string; lastname: string } = JSON.parse(data.toString());
    console.log(`Recieved data from clicnt: ${user.name}`);
    ws.send("How are you?");
  });

  ws.send(`Some message from server`);

  ws.on("close", (reason: any) => {
    console.log(`User gone out!`);
    ws.send("Bye!");
  });
});

import { Router } from "express";
import cors from "cors";
import createImagePost, {
  aboutAllUser,
  createDashboardImage,
  DeleteUse,
  FindUserByEmail,
  GetImageOfProfile,
  getPostsByEmail,
  LoginUser,
  RegisterUser,
  Searching,
  SeeAllPublishedUsers,
} from "./../Functions/Funtions";
import {
  CheckingRegisteringUser,
  CheckToken,
  dashBoardImage,
} from "../MiddleWares/MiddleWare";
import { storage } from "../MiddleWares/MiddleWare";
import multer from "multer";
import {
  allPostsWithoutFilter_InOreder,
  deletePostById,
  postLetter,
  removePostById,
  getVideos,
  editVideosText,
  postComment,
} from "../Functions/Posts";
import { removeSavedFromUser, SavePost } from "../Functions/User";

const router = Router();
const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/chat", require("./../router/chat"));
server.use("/user", require("./../router/user"));
server.use("/post", require("./../router/postImages"));
server.use("/posts", require("./../router/postImages"));

server.use("/comment", require("./../router/comment"));
server.use("/posts", express.static("./postImages"));

server.use("/images", express.static("./profileImages"));
server.use("/videos", express.static("./postVideos"));
server.use("/dashboard", express.static("./dashboardImages"));

server.get("/", aboutAllUser);

server.post("/login", LoginUser);

server.post("/register", CheckingRegisteringUser, RegisterUser);

server.delete("/:id", DeleteUse);

server.post("/searching/:id", Searching);

server.post("/data", CheckToken);
const upload = multer({ storage });
server.post("/profile/image", upload.single("Images"), createImagePost);

const uploadDashboard = multer({ storage: dashBoardImage });
server.post(
  "/dashboard",
  uploadDashboard.single("DashboardImage"),
  createDashboardImage
);

server.get("/users", SeeAllPublishedUsers);

server.get("/image/:email", GetImageOfProfile);

server.get("/data/:token", FindUserByEmail);

server.delete("/removePost/:id", removePostById);

server.post("/post/Text", postLetter);

server.get("/posts", allPostsWithoutFilter_InOreder);

server.get("/posts/:email", getPostsByEmail);

server.delete("/post/:id", deletePostById); //   ID in req.params   AND email in request body

server.get("/videos", getVideos);

server.put("/videos/:id", editVideosText);

server.post("/user/save/:id", SavePost);

server.post("/user/remove/:id", removeSavedFromUser);

server.post("/comment/:postID", postComment);

server.delete("/post/:id", removePostById);
server.listen(PORT, () => {
  console.log(`SERVER: http://localhost:${PORT}`);
});

module.exports = { router };
