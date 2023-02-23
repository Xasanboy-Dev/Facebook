import express from "express";
import { Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
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
  creaetNewPost,
  deletePostById,
  postLetter,
  removePostById,
  getVideos,
  editVideosText,
  postComment,
} from "../Functions/Posts";
import { removeSavedFromUser, SavePost } from "../Functions/User";
dotenv.config();
const router = Router();
const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;
server.use("/post", require("./postImages"));

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

server.post("/newPost", creaetNewPost);

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
