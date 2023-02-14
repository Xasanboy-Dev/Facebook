import path from "path";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import createImagePost, {
  aboutAllUser,
  DeleteUse,
  FindUserByEmail,
  GetImageOfProfile,
  LoginUser,
  RegisterUser,
  Searching,
  SeeAllPublishedUsers,
} from "./../Functions/Funtions";
import { CheckingRegisteringUser, CheckToken } from "../MiddleWares/MiddleWare";
import { storage } from "../MiddleWares/MiddleWare";
import multer from "multer";
dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

server.use("/images", express.static("./Images"));

server.get("/", aboutAllUser);

server.post("/login", LoginUser);

server.post("/register", CheckingRegisteringUser, RegisterUser);

server.delete("/:id", DeleteUse);

server.post("/searching/:id", Searching);

server.post("/data", CheckToken);
const upload = multer({ storage });
server.post("/profile/image", upload.single("Images"), createImagePost);

server.get("/users", SeeAllPublishedUsers);

server.get("/image/:email", GetImageOfProfile);

server.get("/data/:email", FindUserByEmail);

server.listen(PORT, () => {
  console.log(`SERVER: http://localhost:${PORT}`);
});
