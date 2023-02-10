import { useState } from "react"

export default function CreatingPost() {
    let variable: any
    let [clicked, setClick] = useState("")
    function linkClasses(type: string) {
        let classes: string = 'text-2xl  rounded-full mx-5  cursor-pointer flex px-5 justify-content-center'
        clicked = clicked ? clicked : "posts"
        if (type == clicked) {
            classes += " bg-red-500 text-white"
        }
        return classes
    }
    return (
        <div className="border border-black pb-5 m-5 ">
            <div>
                <ul className="flex justify-between pt-3">
                    <div onClick={() => setClick('posts')} className={linkClasses('posts')} style={{ backgroundColor: variable }}>
                        <li className="mx-5 text-2xl">
                            <a>Create a new Post</a>
                        </li>
                    </div>
                    <div onClick={() => setClick('images')} className={linkClasses('images')}>
                        <li className="text-2xl">
                            <a>New a Image</a>
                        </li>
                    </div>
                    <div onClick={() => setClick('video')} className={linkClasses('video')}>
                        <li className="flex justify-content-center mx-5 text-2xl mx-24">
                            <a>Post a new Video</a>
                        </li>
                    </div>
                </ul>
            </div >
        </div >
    )
}