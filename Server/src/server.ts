import express from "express"
import dotenv from "dotenv"
import { CreateUser } from "./../Functions/Funtions"
import { CheckUser } from "../MiddleWare/MiddleWare"
dotenv.config()
const server = express()
const PORT = process.env.PORT

server.get("/registration", CheckUser, CreateUser)

server.listen(PORT, () => {
    console.log(`SERVER: http://localhost:${PORT}`)
})