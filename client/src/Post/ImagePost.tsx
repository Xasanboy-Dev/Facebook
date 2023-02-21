import { Posts } from "./../Ts_files/types"
export default function ImagePost({ showPost, PostBio }: { showPost: (show: boolean) => void, PostBio: any }) {
    let result: Posts = PostBio
    console.log(result)
    return (
        <div className="border brder-dark">
            <div >
                <img src={`http://localhost:8080/posts/${result.title + "_" + result.email}.png`} />
            </div>
            <div className="text text-dark bold">{result.text}</div>
        </div>
    )
}