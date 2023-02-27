import { Router } from "express";
import {
  editUserByEmail,
  getAboutUserWithEmail,
  getUserById,
} from "../Functions/User";
const router = Router();

router.get("/:email", getAboutUserWithEmail);

router.put("/:email", editUserByEmail);

router.get("/:userID", getUserById);
module.exports = router;
