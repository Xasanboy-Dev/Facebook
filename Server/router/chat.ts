import { Router } from "express";
import { getAllDataAboutUser, getAllUsersForChatting } from "../Functions/User";
const router = Router();

router.get("/user/:id", getAllDataAboutUser);

router.get("/Users", getAllUsersForChatting)

module.exports = router;
