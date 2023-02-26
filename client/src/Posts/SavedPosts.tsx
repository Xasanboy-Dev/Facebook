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
      <div className="border p-5 grid grid-cols-3 gap-4 border-dark m-3 rounded">
        {POST.map((post: Posts) => {
          if (post.type_of_post == "Photo") {
            return (
              <div className="div border h-[95%] border-dark rounded">
                <img
                  className="w-full h-[100%]"
                  src={`http://localhost:8080/posts/${post.title + "_" + post.email
                    }.png`}
                />
              </div>
            );
          } else if (post.type_of_post == "Video") {
            return <div></div>;
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
