import axios from "axios"
import { useEffect, useState } from "react"
import { getDataAboutThisUser } from "../Ts_files/user"
import logos from "./../pages/logo.png"
import { User } from "../Ts_files/types"
import { getAllUsersForChattingpage } from "../Ts_files/chat"
import { Navigate } from "react-router-dom"
export default function UseMessagePage() {

    const userID = localStorage.getItem("userID")
    let [logo, setLogo] = useState("")
    let [arr, setArr] = useState<User[]>([])
    if (!userID) {
        window.location.href = '/login'
        return <div></div>
    }
    let [user, setUser] = useState<User>()
    useEffect(() => {
        const users = getAllUsersForChattingpage()
        users.then(res => {
            setArr(res)
            console.log(res)
        })
        let any = getDataAboutThisUser(+userID)
        any.then(res => {
            setUser(res.user)
        })
    }, [])
    function getImages(userEmail: string) {
        axios.get(`http://localhost:8080/images/${userEmail}.png`)
            .catch(function (error) {
                return setLogo(logos)
            });
        if (logo !== userEmail) {
            return logos
        } else {
            return `http://localhost:8080/images/${userEmail}.png`
        }
    }
    function clicked(anotherUserId: number) {
        localStorage.setItem("anotherUser", anotherUserId.toString())
        return window.location.href = '/messages/chat'
    }
    return (
        <div className="border  grid grid-cols-1 m-5 text-center border-dark  rounded">
            {arr.map((aboutUser: User) => (
                <ul className="my-5 flex  justify-content-center items-center gap-[25%]">
                    <img className="w-[5%] items-center  rounded" src={`${getImages(aboutUser.email)}`} />
                    <li className="">
                        <h1 className="font-bold text-3xl text-dark">{aboutUser?.name} {aboutUser?.lastname}</h1>
                        <h1 className="italic text-2xl">{aboutUser?.email}</h1>
                    </li>
                    <li className="">
                        <button onClick={() => clicked(aboutUser.id)} className="flex items-center gap-2 border  rounded text-xl bg-primary text-light p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                            </svg>
                            Chatting
                        </button>
                    </li>
                </ul>
            ))}
        </div>
    )
}