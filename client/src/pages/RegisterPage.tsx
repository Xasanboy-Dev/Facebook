import { useState } from "react"
import axios from "axios"
import { Link, Navigate, useNavigate } from "react-router-dom"
export default function RegisterPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [lastname, setLastname] = useState("")
    function subMit() {
        if (name.length == 0 || email.length == 0 || password.length == 0 || lastname.length == 0) {
            alert("Please fill all the gaps!")
            return
        }
        axios.post("http://localhost:8080/register", { name, lastname, email, password })
            .then(res => {
                if (res.status == 201) {
                    alert("Registered succesfully!")
                    return < Navigate to={"/login"} />
                }
                alert("You have some problems. Please try again later!")
            })
    }
    return (
        <div className="flex justify-content-center mt-60">
            <form className="w-full max-w-lg" onSubmit={subMit} >
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            First Name
                        </label>
                        <input onChange={(e: any) => { setName(e.target.value) }} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="John" />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Last Name
                        </label>
                        <input onChange={(e: any) => { setLastname(e.target.value) }} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Email
                        </label>
                        <input onChange={(e: any) => { setEmail(e.target.value) }} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="email" placeholder="JohnDoe@gmail.com" />
                        <p className="text-gray-600 text-xs italic">Your email here!</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Password
                        </label>
                        <input onChange={(e: any) => { setPassword(e.target.value) }} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
                        <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <button className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-white bg-green-500">Create an account</button>
                    </div>
                </div>
                <div className="flex justify-content-center">
                    <Link to={'/login'} className=" appearance-none block text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-white bg-blue-500">Login</Link>
                </div>
            </form>
        </div>
    )
}