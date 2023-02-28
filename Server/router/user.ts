import { Router } from "express";
import { getAllLikesPosts } from "../Functions/Posts";
import {
  editUserByEmail,
  getAboutUserWithEmail,
  getUserById,
} from "../Functions/User";
const router = Router();

router.get("/:email", getAboutUserWithEmail);

router.put("/:email", editUserByEmail);

router.get("/id/:userID", getUserById);

router.get("/liked/:userID", getAllLikesPosts);
module.exports = router;
