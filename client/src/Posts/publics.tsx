import { Emoji } from "../Settings/emoji";

import axios from "axios";
import logo from "./../pages/logo.png"
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Photos from "./Photos";
export function Publics() {
  let [showEmoji, setShowEmoji] = useState(false);
  let [image, setImage] = useState("");
  let [email, setEmail] = useState("");
  let [letter, setLetter] = useState("");
  let [displayOfVideo, setDisplay] = useState("");
  let [posting, setPost]: any = useState();
  let display: string = "none";
  let warning: string = "none";
  let textForUser: any;
  let max = 3;

  axios.get(`http://localhost:8080/images/${email}.png`)
    .then(res => {
      setImage(`http://localhost:8080/images/${email}.png`)
    }).catch(err => {
      setImage(`https://placeimg.com/380/230/nature`)
    })
  async function BtnPublish() {
    try {
      let images = [
        "jpg",
        "jpeg",
        "img",
        "png",
        "tif",
        "tiff",
        "bmp",
        "gif",
        "eps",
        "avif",
      ];
      let videos = ["mp4", "m4a", "m4p", "m4b", "m4r", "m4v"];
      if (posting) {
        let name: any = posting[0].name.split(".");
        name = name[name.length - 1];
        if (images.includes(name.toLowerCase())) {
          const data = new FormData();
          data.append("Images", posting![0]);
          await axios
            .post("http://localhost:8080/post/postImages", data, {
              headers: {
                Accept: letter,
                "Content-Type": "multipart/form-data",
                Authorization: email,
              },
            })
            .then((res) => {
              if (res.status == 201) {
                alert("Created succesfully");
                return (window.location.href = "/profile");
              }
            })
            .catch((err) => {
              alert(err.message);
            });
        } else {
          if (videos.includes(name.toLowerCase())) {
            const data = new FormData();
            data.append("Videos", posting![0]);
            await axios
              .post("http://localhost:8080/post/postVideos", data, {
                headers: {
                  Accept: letter,
                  "Content-Type": "multipart/form-data",
                  Authorization: email,
                },
              })
              .then((res) => {
                if (res.status == 201) {
                  alert("Added succesfully");
                  return (window.location.href = "/profile");
                }
              });
          } else {
            alert("You must to select PHOTO or VIDEO");
          }
        }
      } else {
        alert(letter);
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  if (letter.length >= max) {
    display = "flex";
  } else {
    if (letter.length > 0) {
      warning = "flex";
      textForUser = `You must write more than ${max - letter.length
        } letter to publish`;
    }
  }
  try {
    let token = localStorage.getItem("token");
    if (!token) {
      return <Navigate to={"/login"} />;
    }
    axios.post("http://localhost:8080/data", { token }).then((res) => {
      if (res.data.token == "jwt malformed") {
        return (window.location.href = "/login");
      }
      setEmail(res.data.token.email);
    });

    async function Link() {
      let link = await axios.get(`http://localhost:8080/images/${email}.png`);
      if (link.status == 200) {
        setImage(`http://localhost:8080/images/${email}.png`);
      }
    }
    Link();
  } catch (error: any) {
    console.log(error.message);
  }

  function getAllPostsOfUser(email: string) {
    axios.get(`http://localhost:8080/posts/${email}`).then((res) => {
      console.log(res.data)
    });
  }
  getAllPostsOfUser(email);

  let postImageSrc: any = document.getElementById("postImage");
  let postVideoSrc: any = document.getElementById(`postVideo`);
  let postingImagetoServer: any;
  let postingVideotoServer: any;
  function getSrcFromVideoTag(str: any) {
    try {
      setDisplay("flex");
      postingVideotoServer = str;
      setPost(str);
      let [file] = str;
      let link = URL.createObjectURL(file);
      postVideoSrc.src = link;
    } catch (error: any) {
      console.log(error.message);
    }
  }
  function getSrcFromImageTag(str: any) {
    try {
      setDisplay("none");
      postingImagetoServer = str;
      setPost(str);
      let [file] = str;
      let link = URL.createObjectURL(file);
      postImageSrc.src = link;
    } catch (error: any) {
      console.log(error.message);
    }
  }
  return (
    <div>
      <div>
        <ul className="p-10">
          <li className="border justify-content-center rounded p-2 gap-2  mx-24 ">
            <div className="justify-content-center rounded p-2 gap-2 flex  items-center mx-24">
              <img className="rounded-full w-16 h-16" src={`${image ? image : logo}`} />
              <textarea
                onChange={(e) => {
                  setLetter(e.target.value);
                }}
                value={letter}
                className={
                  "border textarea text-center text-lg w-full h-full  px-3 pt-2 pb-2 "
                }
                placeholder={`Anything new ?`}
              />
            </div>
            <div className="text-red-900  items-center flex justify-content-center mb-2">
              <div className="w-75 drop-shadow-2xl h-50 img text-center  flex mx-auto mt-[10px] mb-[10px] border m-5">
                <div className="flex">
                  <img
                    style={{
                      display:
                        displayOfVideo == "flex" || displayOfVideo == undefined
                          ? "none"
                          : "flex",
                    }}
                    className="w-full h-full"
                    id="postImage"
                  />
                  <video
                    style={{
                      display: displayOfVideo ? displayOfVideo : "none",
                    }}
                    controls
                    className={" w-full"}
                    id="postVideo"
                  ></video>
                </div>
              </div>
            </div>
            <div
              style={{ display: warning }}
              className="flex justify-content-center"
            >
              <h4 className="flex justify-content-center border p-3 rounded-full w-96 text-green-900 ">
                {textForUser}
              </h4>
            </div>
            <hr />
            <div>
              <ul className="flex justify-content-center gap-5">
                <li className="flex items-center cursor-pointer border p-2 mt-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="text-blue-900 w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  <button className="btn">
                    <b>Create a new Foto</b>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => getSrcFromImageTag(e.target.files)}
                    />
                  </button>
                </li>
                <li className="cursor-pointer flex align-items-center border p-2 mt-2 rounded-full">
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
                      d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                  <button className="btn">
                    Create a new Video
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => getSrcFromVideoTag(e.target.files)}
                    />
                  </button>
                </li>
              </ul>
              <div
                style={{ display }}
                onClick={() => BtnPublish()}
                className="flex justify-content-center mx-5 rounded-full mt-5 mb-3 p-2 bg-green-900  border "
              >
                <button className="text-white text-xl">Publish</button>
              </div>
            </div>
          </li>
        </ul>
        <Photos />
      </div>
    </div>
  );
}