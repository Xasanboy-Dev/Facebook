import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { aboutAllUser, DeleteUse, LoginUser, RegisterUser } from './../Functions/Funtions'
import { CheckingRegisteringUser, CheckUser } from '../MiddleWare/MiddleWare'
dotenv.config()
const server = express()
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
const PORT = process.env.PORT

server.get('/', aboutAllUser)

server.post('/login', LoginUser)

server.post('/register', CheckingRegisteringUser, RegisterUser)

server.delete('/:id',DeleteUse)

server.listen(PORT, () => {
    console.log(`SERVER: http://localhost:${PORT}`)
})
