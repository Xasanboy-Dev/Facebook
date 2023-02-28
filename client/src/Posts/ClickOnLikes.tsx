import { getAllLikedVideos } from "../Ts_files/posts"

export default function ClickOnLikes() {
    let userID = localStorage.getItem("userID")
    if (userID) {
        getAllLikedVideos(+!userID)
            .then(res => {
                if (res) {
                    console.log(res)
                }
            })
    }
    return (
        <h1>THis a videos that you are clicked on likee!</h1>
    )
}