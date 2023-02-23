import axios from "axios";
import { useState } from "react";
import { postLikee, saveThePost } from "../Ts_files/posts";
import { Posts } from "./../Ts_files/types";
import logos from "./../pages/logo.png";
export default function ImagePost({
  PostBio,
}: {
  showPost: (show: boolean) => void;
  PostBio: Posts;
}) {
  let [logo, setLogo] = useState("");
  let [ShowEmoji, setShowEmoji] = useState(false);
  let [text, setText] = useState("");
  let result: Posts = PostBio;
  let data: any = PostBio.createdAt.toString();
  let date = "";
  let time = "";

  try {
    if (!logo) {
      axios
        .get(`http://localhost:8080/images/${result.email}.png`)
        .then((res) => {
          setLogo(`http://localhost:8080/images/${result.email}.png`);
        })
        .catch((err: any) => {
          setLogo(logos);
        });
    }
  } catch (error: any) {
    console.log(error.message);
  }

  let [classes, setClasses] = useState("");
  function Saved(classes: string) {
    if (classes == "bg-dark text-light") {
      return setClasses("");
    } else {
      if (!localStorage.getItem("email")) {
        alert("You must to login");
        return (window.location.href = "/login");
      }
      saveThePost(PostBio, localStorage.getItem("email")!);
      return setClasses("bg-dark text-light");
    }
  }
  for (let i in data) {
    if (+i < 10) {
      date += data[i];
    }
    if (+i > 10 && +i < data.length - 5) {
      time += data[i];
    }
  }
  if (PostBio.type_of_post == "Photo") {
    let [logo, setLogo] = useState("");
    axios
      .get(`http://localhost:8080/posts/${result.title}_${result.email}.png`)
      .then((res) => {
        if (res.status == 200) {
          setLogo(
            `http://localhost:8080/posts/${result.title}_${result.email}.png`
          );
        }
      })
      .catch((err) => {
        setLogo(logos);
      });
    return (
      <div className="w-full">
        <div className="text justify-between flex  text-dark bold">
          <div className="w-[75px] h-[20%] mb-[10px] justify-content-center flex rounded-full">
            <div className="">
              <img src={`${logo}`} className={`ml-[100%] p-2 rounded-full`} />
              <a
                href={`/user/${`${result.email}`}`}
                className="border p-1 border-dark rounded-full  ml-[100%]"
              >
                {result.user_name}
              </a>
            </div>
          </div>
          <div className="items-center flex justify-content-center ">
            <h4>{result.text}</h4>
          </div>
          <div className="gap-[10px] items-center flex mr-[2%]">
            <svg
              onClick={() => Saved(classes)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-8 h-8 ${classes}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="border border-dark rounded-full w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </div>
        </div>
        <hr className="border border-dark " />
        <div className="flex p-2 justify-content-center">
          <img
            className="w-full rounded-[10px] bg-auto"
            style={{ width: "45%", height: "100%" }}
            src={`${logo}`}
          />
        </div>
        <hr className="border border-dark" />
        <div className="text w-full flex items-center m-2 ">
          <div className="w-[100%]">
            <div className="flex justify-content-center text-center">
              <button
                style={{ display: ShowEmoji ? "none" : "flex" }}
                onClick={() => setShowEmoji(true)}
                className="btn border mb-[15px] border-dark text-red-[900] flex items-center"
              >
                Add some emoji
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="text-red-900 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                  />
                </svg>
              </button>
              <div style={{ display: ShowEmoji ? "flex" : "none" }}></div>
            </div>
            <textarea
              onChange={(e: any) => setText(e.target.value)}
              className="comment text-2xl text-center p-2  border border-dark w-[80%] rounded-[10px]"
              placeholder="Write here somthing!"
            />
            <div className="flex justify-content-center gap-5">
              <ul className="flex gap-[15px] ml-[5%]">
                <li className="cursor-pointer">
                  <button
                    onClick={() =>
                      postLikee(result.id, localStorage.getItem("email")!)
                    }
                    className="btn border border-dark flex gap-2  p-2 justify-content-center items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                      />
                    </svg>
                    {result.likes_of_this_Post.length}
                  </button>
                </li>
                <li className="cursor-pointer">
                  <button className="btn border border-dark flex gap-2  p-2 justify-content-center items-center text-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                      />
                    </svg>
                    {result.dislikes_of_this_Post.length}
                  </button>
                </li>
              </ul>
              <button className="btn border border-dark">Comment</button>
              <button className="btn border border-dark">Share</button>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (PostBio.type_of_post == "Video") {
    return (
      <div className="w-full rounded-[25px]">
        <div className="text justify-between flex  text-dark bold">
          <div className="w-[75px] h-[20%] mb-[10px] justify-content-center flex rounded-full">
            <div className="">
              <img src={`${logo}`} className={`ml-[100%] p-2 rounded-full`} />
              <a
                href={`/user/${`${result.email}`}`}
                className="border p-1 border-dark rounded-full  ml-[100%]"
              >
                {result.user_name}
              </a>
            </div>
          </div>
          <div className="items-center flex justify-content-center ">
            <h4>{result.text}</h4>
          </div>
          <div
            className="items-center flex mr-[2%]"
            onClick={() => Saved(classes)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-8 h-8 ${classes}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
          </div>
        </div>
        <div className="w-full  border  border-dark">
          <video
            autoPlay
            controls
            className=" text-auto h-[720px] w-full"
            src={`http://localhost:8080/videos/${result.title}_${result.email}.mp4`}
          />
        </div>
        <div className="text w-full flex items-center m-2 ">
          <div className="w-[80%]">
            <textarea
              className="text-center p-2  border border-dark w-[80%] rounded-[10px]"
              placeholder="Write here somthing!"
            />
            <div className="flex justify-content-center gap-5">
              <ul className="flex gap-[15px] ml-[5%]">
                <li className="cursor-pointer">
                  <button
                    onClick={() =>
                      postLikee(result.id, localStorage.getItem("email")!)
                    }
                    className="btn border border-dark flex gap-2  p-2 justify-content-center items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                      />
                    </svg>
                    {result.likes_of_this_Post.length}
                  </button>
                </li>
                <li className="cursor-pointer">
                  <button className="btn border border-dark flex gap-2  p-2 justify-content-center items-center text-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                      />
                    </svg>
                    {result.dislikes_of_this_Post.length}
                  </button>
                </li>
              </ul>
              <button className="btn border border-dark">Comment</button>
              <button className="btn border border-dark">Share</button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}
