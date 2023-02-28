import axios from "axios";
import { useState } from "react";
import { getAllVideosByUserId } from "../Ts_files/posts";
import { Video } from "../Ts_files/types";
const videos = await getAllVideosByUserId(+localStorage.getItem("userID")!)
export default function Videos() {
  let bool = false
  if (videos.length !== 0) {
    bool = true
  }
  return (
    <div>
      <div className={"grid  grid-cols-4 gap-2  border border-dark mt-3 m-5 rounded"}>
        {
          videos.map((video: Video) => {
            return (
              <div className=" w-full rounded div mx-5 border-dark w-full m-2 border mt-2">
                <video controls src={`http://localhost:8080/videos/${video.title + "_" + video.authorEmail}.mp4`} />
                <h1 className="p-1 text-bold block text-xl">{video.text}</h1>
              </div>
            )
          })
        }
      </div>
      <div style={{ display: bool ? 'none' : 'flex' }} className="mt-5 mx-auto m-[80%] rounded-2xl text-light bg-blue-900  text-2xl border border-dark flex p-4">
        <h1 className="flex justify-content-center">You have not got any published videos!
        </h1>
      </div>
    </div>
  )
}
