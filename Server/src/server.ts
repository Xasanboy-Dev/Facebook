import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import createImagePost, {
  aboutAllUser,
  DeleteUse,
  LoginUser,
  RegisterUser,
  Searching,
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

server.get("/", aboutAllUser);

server.post("/login", LoginUser);

server.post("/register", CheckingRegisteringUser, RegisterUser);

server.delete("/:id", DeleteUse);

server.post("/searching/:id", Searching);

server.post("/data", CheckToken);

server.post("/post/image", upload.single("Image"), createImagePost);

server.listen(PORT, () => {
  console.log(`SERVER: http://localhost:${PORT}`);
});
