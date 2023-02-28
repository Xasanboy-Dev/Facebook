import { Images } from "@prisma/client"
import { getAllPhotosByUserId } from "../Ts_files/posts"
let id = localStorage.getItem("userID")
let answer: Images[] | false
if (id) {
  let response = await getAllPhotosByUserId(+id)
  answer = response.photos
}
export default function Photos() {
  if (answer) {
    return (
      <div className=" border p-5 grid grid-cols-3 gap-4 border-dark m-3 rounded">
        {answer?.map((post: Images) => {
          return (
            <div className="border p-2 rounded border-dark">
              <div className=" block div  border-dark rounded">
                <img src={`http://localhost:8080/posts/${post.title + "_" + post.authorEmail}.png`} />
                <h1 className="text-bold text-xl">{post.title}</h1>
              </div>
            </div>
          );
        })}
      </div >
    );
  } else {
    return (
      <div> Error</div>
    )
  }
}