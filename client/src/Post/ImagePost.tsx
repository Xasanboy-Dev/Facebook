import { useState } from "react"
export default function ImagePost({ showPost, PostBio }: { showPost: (show: boolean) => void, PostBio: any }) {
    showPost(true)
    let [result, setResult]: any = useState("")
    setResult(PostBio)
    let [email, setEmail] = useState("")
    let [type, setType] = useState("")
    let [postName, setPostName] = useState("")
    setPostName(PostBio.title)
    setEmail(PostBio.email)
    setType(PostBio.type_of_post)
    if (type == "Photo") {
        return (
            <div className=" border border-dark">
                <div className="w-[250px] h-[250px]">
                    <img src={`http://localhost:8080/posts/${postName + "_" + email}.png`} />
                </div>
                <div className="text text-dark bold">{result.text}</div>
            </div>

        )
    } else if (type == "Video") {
        return (
            <div className=" border border-dark">
                <div >
                    <video controls src={`http://localhost:8080/videos/${postName + "_" + email}.mp4`} />
                </div>
                <div className="text text-dark bold">{result.text}</div>
            </div>
        )
    } else {
        return (
            <div>Hello World</div>
        )
    }
}