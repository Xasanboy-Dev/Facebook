import { Posts } from "./../Ts_files/types";
import { useEffect, useState } from "react";
import { getAllSavedVideos } from "../Ts_files/posts";
export default function SavedVideos() {
  let email = localStorage.getItem("email");
  let [posts, setPosts] = useState([]);
  if (email) {
    useEffect(() => {
      const result = getAllSavedVideos(email!);
      result.then((res) => {
        setPosts(res);
      })
    }, []);
    let POST: Posts[] = posts;
    return (
      <div className=" border p-5 grid grid-cols-3 gap-4 border-dark m-3 rounded">
        {POST.map((post: Posts) => {
          if (post.type_of_post == "Photo") {
            return (
              <div className="border p-2 rounded border-dark">
                <div className=" m-2 flex items-center gap-2">
                  <img className="w-[15%] h-[65px] rounded-full" src={`http://localhost:8080/images/${post.email}.png`} />
                  <h1 className="text-xl">{post.user_name}</h1>
                </div>
                <div className=" block div  border-dark rounded">
                  <img src={`http://localhost:8080/posts/${post.title + "_" + post.email}.png`} />
                  <h1 className="text-bold text-xl">{post.text}</h1>
                </div>
              </div>
            );
          } else if (post.type_of_post == "Video") {
            return (
              <div className="border p-2 rounded border-dark">
                <div className="m-2 flex items-center gap-2">
                  <img className="w-[10%] h-[55px] rounded-full" src={`http://localhost:8080/images/${post.email}.png`} />
                  <h1>{post.user_name}</h1>
                </div>
                <div className="block div  border-dark rounded">
                  <video controls src={`http://localhost:8080/videos/${post.title + "_" + post.email}.mp4`} />
                  <h1>{post.text}</h1>
                </div>
              </div>
            );
          } else {
            return <div></div>;
          }
        })}
      </div>
    );
  } else {
    window.location.href = "/login";
    return <div>Hello World</div>;
  }
}
