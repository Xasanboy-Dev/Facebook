import { getDataOfUser } from "../Ts_files/user"
import { useEffect, useState } from "react"
import { User } from "../Ts_files/types"
export default function Information() {
    let [user, setUser] = useState<User>()
    let [name, setName] = useState("")
    let [lastname, setLastname] = useState("")
    let [userEmail, setEamil] = useState("")
    let [number, setNumber] = useState("")
    let [address, setAddress] = useState("")
    let [country, setCountry] = useState("")
    let email = localStorage.getItem("email")
    if (email) {
        useEffect(() => {
            const data = getDataOfUser(email!)
            data.then((res) => {
                setUser(res)
            })
        }, [])
    } else {
        window.location.href = '/login'
    }
    if (user) {
        return (
            <div className="border rounded border-dark mt-3">
                <h1 className="flex  justify-content-center text-2xl ">Account settings</h1>
                <div className="grid grid-cols-3 text-center">
                    <div className="m-5 w-full">
                        <label className="block text-xl">First Name</label>
                        <input onChange={(e: any) => setName(e.target.value)} value={name ? name : user.name} className="border border-dark w-[75%] rounded h-[35px]" />
                    </div>
                    <div className="m-5 w-full">
                        <label className="block text-xl">Lastname</label>
                        <input onChange={(e: any) => setLastname(e.target.value)} value={lastname ? lastname : user.lastname} className="border border-dark w-[75%] rounded h-[35px]" />
                    </div>
                    <div className="m-5 w-full">
                        <label className="block text-xl">Email</label>
                        <input onChange={(e: any) => setEamil(e.target.value)} value={userEmail ? userEmail : user.email} className="border border-dark w-[75%] rounded h-[35px]" />
                    </div>
                    <div className="m-5 w-full">
                        <label className="block text-xl">Phone Number</label>
                        <input type="number" value={number ? number : user.phoneNumber} onChange={(e: any) => setNumber(e.target.value)} className="border border-dark w-[75%] rounded h-[35px]" />
                    </div>
                    <div className="m-5 w-full">
                        <label className="block text-xl">Province</label>
                        <select onChange={(e) => setCountry(e.target.value)} value={country ? country : user.Country} className="border border-dark w-[75%] rounded h-[35px] text-center">
                            <option>Uzbekistan</option>
                            <option>Great Britian</option>
                            <option>English</option>
                            <option>Rusia</option>
                            <option>China</option>
                        </select>
                    </div>
                    <div className="m-5 w-full">
                        <label className="block text-xl">Address</label>
                        <input type={"text"} onChange={(e: any) => setAddress(e.target.value)} value={address ? address : user.address} className="border border-dark w-[75%] rounded h-[35px]" />
                    </div>
                </div>
                <div className="flex justify-content-center mb-5 ">
                    <textarea placeholder="Your Bio"
                        className="p-2 text-xl  resize-none rounded  h-[220px] text-center  border border-dark w-[80%]" />
                </div>
                <div className="text-center">
                    <button className="w-full bg-green-900 w-[80%] rounded p-2 text-xl text-light" type="submit">Save</button>
                </div>
            </div>
        )
    } else {
        return (
            <div className="flex justify-content-center"> One minute!</div>
        )
    }
}