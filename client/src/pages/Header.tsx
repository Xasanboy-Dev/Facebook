import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import System from "./SearchingSystem";
export default function Header() {
  const token = localStorage.getItem('token')!
  let disp: any


  function GetDataWithToken(token: string) {
    axios.post('http://localhost:8080/data', { token })
      .then(res => {
        if (res.status !== 200) {
          localStorage.removeItem('token')
          localStorage.removeItem('name')
          window.location.href = '/login'
          return
        }
      })
  }


  let [letter, setText] = useState("");

  if (letter == "") {
    disp = "none"
    localStorage.removeItem('letter')
  } else {
    localStorage.setItem('letter', letter)
    disp = 'block'
  }

  const handleChange = (e: any) => {
    setText(e.target.value);
  };

  function funcForSearching() {
    GetDataWithToken(token)
    console.log(letter)
  }
  return (
    <nav>
      <ul className="flex  justify-between p-2 mx-2 mt-1 ">
        <Link to={'/'} className='btn'>
          <a className="text-bold-500 mx-5 text-2xl text-blue-500 font-bold">Facebook</a>
        </Link>
        <li className="block gap-2">
          <div>
            <div className="input-group mb-3 w-96">
              <input
                title="Searching system"
                type="text"
                onChange={handleChange}
                className="form-control rounded-full"
                placeholder="Serach Facebook"
                aria-label="Username"
                aria-describedby="basic-addon1"
              ></input>
              <span className="input-group-text" title="Searching button" id="basic-addon1">
                <svg
                  onClick={funcForSearching}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 rounded-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </li>
        <div>
          <li className="flex gap-2">
            <div className="p-2 border rounded-full">
              <a className="text-9xl" title={'Messages'}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </div>
            <div className="p-2 border rounded-full">
              <a title={'Notifications'}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
            <Link to={'/profile'}
              className={`cursor-pointer p-2 border rounded-full`}
              title="Account"
            >
              <a className="d-flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>{localStorage.getItem('name')}</p>
              </a>
            </Link>
          </li>
        </div>
      </ul>
      <div className="border"></div>
      <ul className="flex justify-center">
        <li>
          <div style={{ display: disp }} className='rounded-full w-96'>
            <System />
          </div>
        </li>
      </ul>
    </nav >
  );
}
