import path from "path"
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import createImagePost, {
  aboutAllUser,
  DeleteUse,
  LoginUser,
  RegisterUser,
  Searching,
  SeeAllPublishedUsers,
} from "./../Functions/Funtions";
import {
  CheckingRegisteringUser,
  upload,
  CheckToken,
} from "../MiddleWares/MiddleWare";
dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT;

server.use('./../images', express.static(path.join(__dirname, 'images')))

server.get("/", aboutAllUser);

server.post("/login", LoginUser);

server.post("/register", CheckingRegisteringUser, RegisterUser);

server.delete("/:id", DeleteUse);

server.post("/searching/:id", Searching);

server.post("/data", CheckToken);

server.post("/profile/image",// upload.single("Image"),
  createImagePost);

server.get('/users', SeeAllPublishedUsers)

server.post('/profile/image')
server.get('/posts',)
server.listen(PORT, () => {
  console.log(`SERVER: http://localhost:${PORT}`);
});
