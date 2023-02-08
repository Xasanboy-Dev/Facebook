import { useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function emailChange(e: any) {
    setEmail(e.target.value)
  }

  function passwordChange(e: any) {
    setPassword(e.target.value)
  }

  function Submit() {
    if (email.length == 0 || password.length == 0) {
      alert("Please fill all the gaps!")
      return
    }
    axios.post('http://localhost:8080/login', { email, password })
      .then(res => {
        if (res.status == 200) {
          alert("Good!")
          return
        } else {
          alert("Bad")
        }
      })
  }
  return (
    <div>
      <form onSubmit={Submit} className="flex gap-28 items-center justify-content-center mt-52 decoration-sky-600">
        <div>
          <img className="text-2xl" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJn-_XaM3cV3ASBGKiYnZsaN2N4h7yoc7pw8uW2atCQ1ZqnxvfLCpxAnhazzgfSQIjPWM&usqp=CAU" alt="Facebook" />
          <h4 className="text-2xl">Facebook hepls you connect and share<br />with the people in your life</h4>
        </div>
        <div className="border rounded  flex justify-content-center">
          <ul>
            <div className=" mb-5 mt-10 mx-5">
              <li className="rounded-xl">
                <input onChange={emailChange} type="email" className="border rounded-full w-96 p-2" placeholder="Enter your Address" />
              </li>
              <br />
              <li className="rounded-xl">
                <input type="password" onChange={passwordChange} className="w-96 p-2 text-xl border rounded-full" placeholder="Password" />
              </li>
              <li>
                <button className="w-96 p-2 flex justify-content-center bg-blue-500 mt-3 text-white text-2xl rounded-full">Login</button>
              </li>
              <div className="flex justify-content-center">
                <li>
                  <Link to={'/register'} className="w-86 p-2 mt-3 flex text-white  justify-content-center bg-green-500 text-2xl rounded-full">Create a new account</Link>
                </li>
              </div>
            </div>
          </ul>
        </div>
      </form>
    </div>
  );
}
