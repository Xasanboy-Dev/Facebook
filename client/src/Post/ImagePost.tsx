import { Route } from "react-router-dom"
import { Posts } from "./../Ts_files/types"
export default function ImagePost({ showPost, PostBio }: { showPost: (show: boolean) => void, PostBio: Posts }) {
    let result: Posts = PostBio
    if (PostBio.type_of_post == "Photo") {
        return (
            <div className="w-full">
                <div className="">
                    <img className="w-[35px] bg-auto w-[100%] h-[50%]" src={`http://localhost:8080/posts/${result.title}_${result.email}.png`} />
                </div>
                <div className="text text-dark bold">{result.text}</div>
            </div>
        )
    } else if (PostBio.type_of_post == "Video") {
        return (
            <div className="w-full ">
                <div className="text text-dark bold">
                    <div className="Profile">
                        <img src={`http://localhost:8080/images/${result.email}.png`} />
                    </div>
                </div>
                <div className="w-full border border-dark">
                    <video autoPlay controls className="text-auto h-[720px] w-full" src={`http://localhost:8080/videos/${result.title}_${result.email}.mp4`} />
                </div>
                <div className="text w-full">
                    <ul>
                        <li>
                            <button onClick={()=>}></button>
                        </li>
                    </ul>
                </div>
            </div>
        )
    } else {
        return (
            <div>{PostBio.text}</div>
        )
    }
}