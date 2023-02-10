import { useState } from "react"

export default function CreatingPost() {
    let variable: any
    const [clicked, setClick] = useState("")
    console.log(clicked)
    return (
        <div className="border border-black h-96 m-5 ">
            <div>
                <ul className="flex justify-between pt-3">
                    <div onClick={() => setClick('post')} className="w-full  mx-24 flex p-2 justify-content-center" style={{ backgroundColor: variable }}>
                        <li className="mx-5 text-2xl">
                            <a>Create a new Post</a>
                        </li>
                    </div>
                    <div onClick={() => setClick('post')} className="w-full flex mx-24 p-2 justify-content-center bg-red-500">
                        <li className="text-2xl">
                            <a>New a Image</a>
                        </li>
                    </div>
                    <div className="w-full p-2 " onClick={() => setClick('post')}>
                        <li className="mx-5 text-2xl mx-24">
                            <a>Post a new Video</a>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    )
}