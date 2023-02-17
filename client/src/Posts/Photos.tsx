import axios from "axios"
import { useState } from "react"
export default function Photos() {
    let [photos, setPosts] = useState([])
    let [email, setEmail] = useState("")
    let [title, setTitle] = useState("")
    axios.get(`http://localhost:8080/image/${localStorage.getItem("token")}`)
        .then(res => {
            if (res.status !== 200) {
                return window.location.href = '/login'
            }
            setPosts(res.data.Photos)
            setTitle(res.data.Photos[0].title)
            setEmail(res.data.Photos[0].email)
            console.log(title + "_" + email)
        })
    return (
        <div>
            {photos.map((result: any) => {
                return <div className="text-center border border-dark ">
                    <div className="w-25 justify-start flex">
                        <h4>Recmonede for you!</h4>
                    </div>
                    <div className="">
                        <div className="flex items-center w-12 h-12 cursor-pointer ">
                            <img className="rounded-full" src={`http://localhost:8080/posts/${title + "_" + email}.png`} />
                            <h1 className="text-blue-900">{result.user_name}</h1>
                        </div>
                        <h1 className=" text-xl bold text-black">{result.text}</h1>
                    </div>
                    <div className="w-25 h-25 inline-flex justify-content-center">
                        <img src={`http://localhost:8080/posts/photo_2021-10-28_17-49-21.jpg_hasan@gmail.com.png`} />
                    </div>
                </div>
            })}
        </div>
    )
}