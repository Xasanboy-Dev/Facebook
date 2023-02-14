import axios from "axios";
import { useState } from "react";
import logo from "./logo.png";
import fs from "fs";
export default function Profile() {
  const [email, useEmail] = useState("");
  const [img, setImg] = useState(null);
  const [avatar, setAvatar] = useState(null);
  let token = localStorage.getItem("token");
  const [name, useName] = useState("");
  if (!token) {
    window.location.href = "/login";
    return;
  } else {
    axios.post("http://localhost:8080/data", { token }).then((res) => {
      if (res.status !== 200) {
        window.location.href = "/login";
        localStorage.removeItem("token");
        return <div>Hello</div>;
      } else {
        useName(res.data.token.name);
        useEmail(res.data.token.email);
      }
    });
  }
  async function sendFile() {
    try {
      const data = new FormData();
      data.append("Images", img!);
      await axios
        .post("http://localhost:8080/profile/image", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: email,
          },
        })
        .then((res) => {
          console.log(res.data);
        });
    } catch (error: any) {
      console.log(error);
    }
  }
  return (
    <div>
      <div className="img flex items-end justify-content-between  m-2 rounded-xl">
        <ul className="flex justigy-between w-24 items-end mb-4">
          <li className="p-2">
            <div className="flex items-end">
              <div className="flex FIRST bg-red-500 flex justify-content-center items-end rounded-full image border cursor-pointer">
                {avatar ? (
                  <img className="logo" src={`${avatar}`} alt="avatar" />
                ) : (
                  <img
                    src={`${logo}`}
                    className="profileIMage"
                    alt="your image"
                  />
                )}
              </div>
            </div>
            <a className="border p-2 mx-14 cursor-pointer rounded-full">
              {name}
            </a>
          </li>
          <li>
            <form
              action="http://localhost:8080/profile/image"
              method="POST"
              encType="multipart/form-data"
              onClick={sendFile}
              className="btn-warning"
            >
              <input
                onChange={(e) => setImg(e.target.files[0])}
                accept="image/*"
                className="file"
                type="file"
              />
              <i className="bi bi-image-fill"></i>Change your image!
            </form>
          </li>
        </ul>
        <div className="">
          <form action="http://localhost:8080/profile/dashboard/image">
            <button type="submit" className="btn1-warning mx-2">
              <input accept="image/*" className="file" type="file" />
              <i className="bi bi-image-fill"></i>Change dashboard image!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
