import logos from "./../pages/logo.png"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import { useContext, useEffect, useState } from "react"
import { Context } from "../main"
import { getDataAboutUser } from "../Ts_files/chat"
import axios from "axios"
export default function ChatUser() {
    const { auth } = useContext(Context)
    let userID = localStorage.getItem("userID")
    let anotherID = localStorage.getItem("anotherUser")
    if (!userID || !anotherID) {
        window.location.href = '/login'
        return <div></div>
    }
    const [value, setValue] = useState("")
    const div: HTMLDivElement | null = document.querySelector(".table")
    let [name, setName] = useState("")
    let [anotherEmail, setAnotherEmail] = useState("")
    useEffect(() => {
        const response = getDataAboutUser(+anotherID!)
        response.then((res) => {
            if (res) {
                setName(res.name)
                setAnotherEmail(res.email)
            } else {
                window.location.href = '/login'
                return
            }
        })
    })
    let [image, setImage] = useState("")
    useEffect(() => {
        axios.get(`http://localhost:8080/images/${anotherEmail}.png`)
            .then(res => {
                if (res.status == 200) {
                    setImage(`http://localhost:8080/images/${anotherEmail}.png`)
                } else {
                    setImage(logos)
                }
            })
            .catch(err => {
                setImage(logos)
            })
        if (localStorage.getItem("email") == anotherEmail) {
            setImage(`http://localhost:8080/images/${localStorage.getItem("email")}.png`)
        }
    })
    const sendMessage = () => {
        let NewDiv = document.createElement("div")
        let h1 = document.createElement("h1")
        let Profileimage = document.createElement("img")
        Profileimage.src = image
        NewDiv.classList = 'flex p-2'
        h1.textContent = value
        NewDiv.append(Profileimage)
        NewDiv.append(h1)
        Profileimage.classList = 'rounded-full w-[5%] '
        div?.append(NewDiv)
    }

    return (
        <Container>
            <Grid container className="" style={{ height: window.innerHeight - 50, marginTop: 20 }}>
                <div className="" style={{ width: "90%", height: "70vh", border: "1px solid gray", overflow: "auto" }}>
                    <ul className="w-full bg-blue-900  border border-dark  flex justify-content-center items-center h-auto">
                        <li className="">
                            <img className="p-2 w-[25%] h-[25%] rounded-full" src={`${image}`} />
                        </li>
                        <li className=" text-2xl w-full text-light">
                            <li> {anotherID == userID ? "Favorites" : " Name: " + name}</li>
                            <li>{anotherID == userID ? "" : "Email: " + anotherEmail}</li>
                        </li>
                    </ul>
                    <div className="">
                        <div className="table overflow-scroll">

                        </div>
                    </div>
                </div>
                <Grid container direction={"column"} alignItems={"flex-end"} style={{ width: "80%" }}>
                    <TextField
                        fullWidth
                        rowsMax={2}
                        variant={"outlined"}
                        value={value}
                        onChange={(e: any) => setValue(e.target.value)}
                    />
                    <Button onClick={sendMessage} variant={"outlined"}>Send</Button>
                </Grid>
            </Grid>
        </Container>
    )
}