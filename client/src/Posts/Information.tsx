import { editUserData, getDataOfUser } from "../Ts_files/user"
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
    let [bio, setBio] = useState("")
    let email = localStorage.getItem("email")
    let [bool, setBool] = useState(Boolean)
    if (email) {
        useEffect(() => {
            const data = getDataOfUser(email!)
            data.then((res) => {
                setUser(res)
                setName(res.name)
                setLastname(res.lastname)
                setEamil(res.email)
                setNumber(res.phoneNumber)
                setCountry(res.Country)
                setAddress(res.address)
                setBio(res.Bio)
            })
        }, [])
    } else {
        window.location.href = '/login'
    }

    async function editUser() {
        const expression: RegExp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
        const checkEmail = expression.test(userEmail)
        if (checkEmail) {
            const result: { status: number, text: string } = await editUserData(
                user!,
                name,
                lastname,
                userEmail,
                number,
                address,
                country,
                bio
            )
            if (result.status == 201) {
                setBool(false)
            }
            alert([result.text])
        } else {
            alert("You must enter correct email!")
        }
    }

    if (bio !== user?.Bio || name !== user?.name || lastname !== user.lastname || userEmail !== user.email || number !== user.phoneNumber || address !== user.address || country !== user.Country) {
        bool = true
    }
    if (user) {
        return (
            <div className="border m-2 rounded border-dark mt-3">
                <h1 className="flex  justify-content-center text-2xl ">Account settings</h1>
                <div className="grid grid-cols-3 text-center">
                    <div className="m-5 w-full">
                        <label className="block text-xl">First Name</label>
                        <input onChange={(e: any) => setName(e.target.value)} value={name == "" || name ? name : user.name} className="border border-dark w-[75%] rounded h-[35px] p-2"/>
                    </div>
                    <div className="m-5 w-full">
                        <label className="block text-xl">Lastname</label>
                        <input onChange={(e: any) => setLastname(e.target.value)} value={lastname == "" || lastname ? lastname : user.lastname} className="border border-dark w-[75%] rounded p-2 h-[35px]" />
                    </div>
                    <div className="m-5 w-full">
                        <label className="block text-xl">Email</label>
                        <input type="email" onChange={(e: any) => setEamil(e.target.value)} value={userEmail == "" || userEmail ? userEmail : user.email} className="p-2 border border-dark w-[75%] rounded h-[35px]" />
                    </div>
                    <div className="m-5 w-full">
                        <label className="block text-xl">Phone Number</label>
                        <input type="number" value={number == "" || number ? number : user.phoneNumber} onChange={(e: any) => setNumber(e.target.value)} className="p-2 border border-dark w-[75%] rounded h-[35px]" />
                    </div>
                    <div className="m-5 w-full">
                        <label className="block text-xl">Province</label>
                        <select onChange={(e) => setCountry(e.target.value)} value={country == "" || country ? country : user.Country} className="border border-dark w-[75%] rounded h-[35px]">
                            <option>Uzbekistan</option>
                            <option>Great Britian</option>
                            <option>English</option>
                            <option>Russia</option>
                            <option>China</option>
                        </select>
                    </div>
                    <div className="m-5 w-full">
                        <label className="block text-xl">Address</label>
                        <input type={"text"} onChange={(e: any) => setAddress(e.target.value)} value={address == "" || address ? address : user.address} className="border border-dark w-[75%] p-2 rounded h-[35px]" />
                    </div>
                </div>
                <div className="flex justify-content-center mb-5 ">
                    <textarea onChange={(e) => (setBio(e.target.value))} value={bio == "" || bio ? bio : user.Bio} placeholder="Your Bio"
                        className="p-2 text-xl  resize-none rounded  h-[220px] text-start  border border-dark w-[80%]" />
                </div>
                <div onClick={() => bool ? editUser() : bool = false} className={`text-center flex justify-content-center mb-5`} >
                    <h1 className={`w-full bg-${bool ? "green-800 cursor-pointer" : "slate-400 cursor-not-allowed"}   w-[60%] rounded p-2 text-xl text-light`} >Save</h1>
                </div>
            </div >
        )
    } else {
        return (
            <div className="flex justify-content-center"> Please update the page. Or wait just a minute! </div>
        )
    }
}