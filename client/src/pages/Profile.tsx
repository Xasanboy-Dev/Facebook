import axios from "axios";
import logo from "./logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Profile() {
  const [img, setImg] = useState(null);
  const [email, useEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  let token = localStorage.getItem("token");
  const [name, useName] = useState("");
  let [dashboardImage, setDashboardImage] = useState(null);
  if (dashboardImage) {
    async function SelectedDashBoardImage() {
      const data = new FormData();
      data.append("DashboardImage", dashboardImage!);
      await axios
        .post("http://localhost:8080/dashboard", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: email,
          },
        })
        .then((res) => {});
    }
    SelectedDashBoardImage();
    window.location.href = window.location.href;
  }

  if (img) {
    async function Selected() {
      try {
        const data = new FormData();
        data.append("Images", img!);
        await axios.post("http://localhost:8080/profile/image", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: email,
          },
        });
        let url = window.location.href;
        window.location.href = url;
      } catch (error: any) {
        console.log(error);
      }
    }
    Selected();
  }
  if (!token) {
    window.location.href = "/login";
    return <div>Helo</div>;
  } else {
    axios.post("http://localhost:8080/data", { token }).then((res) => {
      if (res.status !== 200) {
        window.location.href = "/login";
        localStorage.removeItem("token");
        return <div>Hello</div>;
      } else {
        useName(localStorage.getItem("name")!);
        useEmail(res.data.token.email);
        setAvatar(`http://localhost:8080/images/${email}.png`);
      }
    });
  }
  let split = window.location.href.split("/");
  function linkClasses(type: string) {
    let classes =
      "flex justify-content-center items-center w-full rounded-full cursor-poniter";
    if (type === split[split.length - 1]) {
      classes += " bg-blue-900 text-white ";
    }
    return classes;
  }
  return (
    <div>
      <div
        className="flex w-full dashboard  img items-end h-[95px]  justify-content-between  m-2 rounded-xl"
      >
        <ul className="flex justigy-between w-24 items-end mb-4">
          <li className="p-2">
            <div className="flex items-end">
              <div className="flex FIRST bg-red-500 flex justify-content-center items-end rounded-full image border cursor-pointer">
                {avatar ? (
                  <img
                    className="z-1 border text-bold logo rounded-full h-full w-full"
                    src={`${avatar}`}
                    alt="Your foto"
                  />
                ) : (
                  <img
                    src={`${logo}`}
                    className="profileIMage"
                    alt="your image"
                  />
                )}
              </div>
            </div>
            <a className="bg-dark text-white border p-2 mx-14 cursor-pointer rounded-full">
              {name}
            </a>
          </li>
          <li>
            <form
              action="http://localhost:8080/profile/image"
              method="POST"
              encType="multipart/form-data"
              className="btn-warning"
            >
              <button type="submit">
                <input
                  onChange={(e) => setImg(e.target.files[0])}
                  accept="image/*"
                  className="file"
                  type="file"
                />
              </button>
              <i className="bi bi-image-fill"></i>Change your image!
            </form>
          </li>
        </ul>
        <div>
          <form
            method="POST"
            action="http://localhost:8080/profile/dashboard/image"
          >
            <button type="submit" className="btn1-warning mx-2">
              <input
                accept="image/*"
                onChange={(e) => setDashboardImage(e.target.files[0])}
                className="file"
                type="file"
              />
              <i className="bi bi-image-fill"></i>Change dashboard image!
            </button>
          </form>
        </div>
      </div>
      <div>
        <div className="border mx-5 mt-3 rounded-full">
          <ul className="p-2 justify-content-center flex gap-14 mx-5 text-center">
            <li className={linkClasses("")}>
              <Link to={"/profile"}>
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
                    d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
                  />
                </svg>
                Publications
              </Link>
            </li>
            <li>
              <h1 className="border h-full"></h1>
            </li>
            <li className={linkClasses("information")}>
              <Link className="inline-flex p-2" to={"/profile/information"}>
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
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                Informations
              </Link>
            </li>
            <li>
              <h1 className="border h-full"></h1>
            </li>
            <li className={linkClasses("friends")}>
              <Link to={"/profile/friends"} className=" p-2 inline-flex">
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
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>
                Friends
              </Link>
            </li>
            <li>
              <h1 className="border h-full"></h1>
            </li>
            <li className={linkClasses("photos")}>
              <Link className="inline-flex p-2" to={"/profile/photos"}>
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
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                Photos
              </Link>
            </li>
            <li>
              <h1 className="h-full border"></h1>
            </li>
            <li className={linkClasses("videos")}>
              <Link className="inline-flex p-2" to={"/profile/videos"}>
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
                    d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
                Videos
              </Link>
            </li>
            <li>
              <h1 className="border h-full"></h1>
            </li>
            <li className={linkClasses("likes")}>
              <Link className="inline-flex p-2" to={"/profile/likes"}>
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
                Likes
              </Link>
            </li>
            <li>
              <h1 className="border h-full"></h1>
            </li>
            <li className={linkClasses("search")}>
              <Link className="inline-flex p-2" to={"/profile/search"}>
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
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                Search
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
