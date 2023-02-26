import { Router } from "express";
import { editUserByEmail, getAboutUserWithEmail } from "../Functions/User";
const router = Router()

router.get('/:email', getAboutUserWithEmail)

router.put('/:email',editUserByEmail)

module.exports = router