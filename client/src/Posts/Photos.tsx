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
        })
    return (
        <div className="grid grid-cols-3 gap-4 pt-2 px-3" >
            {
                photos.map((result: any) => {
                    return <div className="rounded-[10px] text-center border border-dark ">
                        
                        {/* <div className="flex justify-between items-center">
                            <h4 className="text-[25px] text-bold flex justify-content-center w-[1000px]">Recmonede for you!</h4>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[65px] h-[65px]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div> */}
                        <hr  className="mb-[10px]"/>
                        
                        <div className="">
                            {/* <div className="flex items-center w-12 h-12 cursor-pointer ">
                                <img className="rounded-full" src={`http://localhost:8080/posts/${title + "_" + email}.png`} />
                                <a href={`/progile/${email}`} className="text-blue-900">{result.user_name}</a>
                            </div> */}
                            <h1 className=" text-xl bold text-black">{result.text}</h1>
                        </div>
                        
                        <div className="w-25 h-25 inline-flex justify-content-center">
                            <img src={`http://localhost:8080/posts/photo_2021-10-28_17-49-21.jpg_hasan@gmail.com.png`} />
                        </div>

                    </div>
                })
            }
        </div >
    )
}