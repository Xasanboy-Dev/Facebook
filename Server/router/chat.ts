import { Router } from "express";
import { getAllDataAboutUser } from "../Functions/User";
const router = Router();

router.get("/user/:id", getAllDataAboutUser);

module.exports = router;
