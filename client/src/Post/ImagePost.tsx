import axios from "axios";
import { useEffect, useState } from "react";
import { addComment, postDisLikee, postLikee, saveThePost, sendSavedOrUnsaved } from "../Ts_files/posts";
import { Posts, User } from "./../Ts_files/types";
import CommentOfPost from "./comments";
import Service from "../Settings/serviceOfPost";
import logos from "./../pages/logo.png";
import { getUsrById } from "../Ts_files/user";
export default function ImagePost({
  PostBio,
}: {
  showPost: (show: boolean) => void;
  PostBio: Posts;
}) {
  let [logo, setLogo] = useState("");
  let [text, setText] = useState("");
  let [bool, setBool] = useState(false)
  let [click, setClick] = useState(false)
  let result: Posts = PostBio;
  let [user, setUser] = useState<User>()
  useEffect(() => {
    let userBio = getUsrById(+localStorage.getItem("userID")!)
    userBio.then(res => {
      setUser(res)
    })
  })
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
  async function Saved() {
    const userEmail = localStorage.getItem("email")
    const postId = result.id
    const anythingElse: string = await sendSavedOrUnsaved(userEmail!, postId)
    if (anythingElse == "Saved succesfully!") {
      setClasses("bg-dark text-light")
    } else {
      setClasses("")
    }
  }
  let savedUsersFromPost = result.savedUser
  let email = localStorage.getItem("email")
  if (email && savedUsersFromPost.includes(email)) {
    classes = ("bg-dark text-light")
  }
  if (PostBio.type_of_post == "Photo") {
    let [postImage, setPostImage] = useState("");
    axios
      .get(`http://localhost:8080/posts/${result.title}_${result.email}.png`)
      .then((res) => {
        if (res.status == 200) {
          setPostImage(
            `http://localhost:8080/posts/${result.title}_${result.email}.png`
          );
        }
      })
      .catch((err) => {
        setPostImage(logos);
      });
    let [bool, setBool] = useState(false)
    let letter: string = ""
    if (text.length > 0) {
      letter = "  btn border border-dark"
    }
    return (
      <div className="w-full" >
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
            <h4 className="text-2xl">{result.text}</h4>
          </div>
          <div className="gap-[10px] items-center flex mr-[2%]">
            <svg
              onClick={() => Saved()}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-8 h-8 ${classes}`}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
            <svg onClick={() => setClick(true)}
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
        <div style={{ display: bool ? 'none' : 'flex' }} className="flex p-2 justify-content-center">
          <div style={{ display: click ? 'flex' : 'none' }} className={"mt-[10%]   position-absolute "}>
            <Service setShow={setClick} post={result} user={user} />
          </div>
          <img
            className="w-full rounded-[10px] bg-auto"
            style={{ width: "45%", height: "100%" }}
            src={`${postImage}`}
          />
        </div>
        <div className="w-full h-full  m-5" style={{ display: bool ? 'flex' : 'none' }}>
          <CommentOfPost bool={bool} POST={result} setShowCooment={setBool} />
        </div>
        <hr className="border border-dark" />
        <div className="text w-full flex items-center m-2 ">
          <div className="w-[100%]">
            <div className="justify-content-center items-center">
              <textarea
                onChange={(e: any) => setText(e.target.value)}
                className=" resize-none overflow-scroll h-[80%]  comment text-xl text-center p-2  border border-dark w-[80%] rounded-[10px]"
                placeholder="Write here somthing!"
              />
              <div className=" justify-start">
                <button style={{ display: letter.length > 0 ? "inline-flex" : 'none' }} onClick={() => addComment(result.id, localStorage.getItem("email")!, text)} className={`${letter}`} >Send</button>
              </div>
            </div>
            <div className="flex justify-content-center gap-5">
              <ul className="flex gap-[15px] mt-3 ml-[5%]">
                <li className="bg-green-700 cursor-pointer">
                  <button
                    onClick={() =>
                      postLikee(result.id, localStorage.getItem("email")!)
                    }
                    className="btn text-light border border-dark flex gap-2  p-2 justify-content-center items-center"
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
                <li className="cursor-pointer bg-red-900">
                  <button onClick={() => postDisLikee(result.id, localStorage.getItem('email')!)}
                    className="text-light btn border border-dark flex gap-2  p-2 justify-content-center items-center text-bold">
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
                <button className="btn flex  border border-dark" onClick={() => setBool(true)}>Comments</button>
              </ul>
            </div>
          </div>
        </div>
      </div >
    );
  } else if (PostBio.type_of_post == "Video") {
    let letter: string = ""
    if (text.length > 0) {
      letter = "  btn border border-dark"
    }
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
            <h4 className="text-2xl">{result.text}</h4>
          </div>
          <div
            className="gap-1 items-center flex mr-[2%]"
          >
            <svg
              onClick={() => Saved()}
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
            <svg onClick={() => setClick(true)}
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
        <div style={{ display: bool ? 'none' : 'flex' }} className="w-full  border  border-dark">
          <video
            controls
            className=" text-auto h-[720px] w-full"
            src={`http://localhost:8080/videos/${result.title}_${result.email}.mp4`}
          />
          <div style={{ display: click ? 'flex' : 'none' }} className={"mt-[10%] mx-[35%]  position-absolute "}>
            <Service setShow={setClick} post={result} user={user} />
          </div>
        </div>
        <div className="text w-full flex items-center m-2 ">
          <div className="w-[100%]">
            <div className=" w-full h-full  m-5" style={{ display: bool ? 'flex' : 'none' }}>
              <CommentOfPost bool={bool} POST={result} setShowCooment={setBool} />
            </div>
            <textarea onChange={(e: any) => setText(e.target.value)}
              className="text-xl text-center p-2  border border-dark w-[80%] rounded-[10px]"
              placeholder="Write here somthing!"
            />
            <div className=" m-2 justify-start">
              <button style={{ display: letter.length > 0 ? "inline-flex" : 'none' }} onClick={() => addComment(result.id, localStorage.getItem("email")!, text)} className={`${letter}`} >Send</button>
            </div>
            <div className="flex justify-content-center gap-5">
              <ul className="flex gap-[15px] ml-[5%]">
                <li className="bg-green-700 cursor-pointer">
                  <button
                    className="text-light btn border border-dark flex gap-2  p-2 justify-content-center items-center"
                    onClick={() =>
                      postLikee(result.id, localStorage.getItem("email")!)
                    }
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
                <li className="bg-red-900 cursor-pointer">
                  <button onClick={() => postDisLikee(result.id, localStorage.getItem('email')!)} className="text-light btn border border-dark flex gap-2  p-2 justify-content-center items-center text-bold">
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
                <button onClick={() => setBool(true)} className="btn border border-dark">Comment</button>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>
      This is for text posts!
    </div>;
  }
}
