import { Router } from "express";
import {  getAboutUserWithEmail } from "../Functions/User";
const router = Router()

router.get('/:email', getAboutUserWithEmail)


module.exports = router