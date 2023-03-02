import axios from "axios"
import { useEffect, useState } from "react"
import { getDataAboutThisUser } from "../Ts_files/user"
import logos from "./../pages/logo.png"
import { User } from "../Ts_files/types"
export default function UseMessagePage() {
    const userID = localStorage.getItem("userID")
    let [logo, setLogo] = useState("")
    if (!userID) {
        window.location.href = '/login'
        return <div></div>
    }
    let [user, setUser] = useState<User>()
    useEffect(() => {
        let any = getDataAboutThisUser(+userID)
        any.then(res => {
            setUser(res.user)
        })
    }, [])
    try {
        console.log(user)
        axios.get(`http://localhost:8080/images/${user?.email}.png`)
            .then(res => {
                if (res.status == 200) {
                    setLogo(`http://localhost:8080/images/${user?.email}.png`)
                }
            })
            .catch(err => {
                setLogo(logos)
            })
    } catch (error: any) {
        setLogo(logos)
    }
    let arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return (
        <div className="border justify-content-center m-5 text-center gap-4 items-center border-dark  rounded">
            {arr.map(aboutUser => (
                <div className="my-5">
                    <div className="flex justify-content-center items-center gap-[25%]">
                        <img className="w-[5%] items-center  rounded" src={`${logo}`} />
                        <div className="">
                            <h1 className="font-bold text-3xl text-dark">{user?.name} {user?.lastname}</h1>
                            <h1 className="italic text-2xl">{user?.email}</h1>
                        </div>
                        <div className="">
                            <button className="flex items-center gap-2 border  rounded text-xl bg-primary text-light p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                </svg>
                                Chatting
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}