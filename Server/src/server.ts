import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  aboutAllUser,
  DeleteUse,
  LoginUser,
  RegisterUser,
  Searching,
} from "./../Functions/Funtions";
import { CheckingRegisteringUser, CheckToken } from "../MiddleWare/MiddleWare";
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

server.post('/data', CheckToken)

server.listen(PORT, () => {
  console.log(`SERVER: http://localhost:${PORT}`);
});
