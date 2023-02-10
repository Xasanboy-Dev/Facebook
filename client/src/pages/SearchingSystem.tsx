import axios from "axios"
import { useState } from "react"
export default function System() {
    const [one, setUsers] = useState(Boolean)
    const [two, setPosts] = useState(Boolean)
    const [three, setHashtag] = useState(Boolean)
    if (localStorage.getItem('letter')) {
        console.log(localStorage.getItem('letter'))
        axios.post(`http://localhost:8080/searching/${localStorage.getItem('letter')}`, { users: one, posts: two, hashtag: three })
            .then(res => {
                console.log(res.data)
            })
    }
    return (
        <div className=" bg-red-500 items-center flex justify-between">
            <div className="mx-5 flex">
                <input type={'checkbox'} className='w-5 accent-stone-500' onChange={(e) => setUsers(e.target.checked)} />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                Users</div>
            <div className="flex p-2">
                <input type={'checkbox'} onChange={(e) => setPosts(e.target.checked)} className='w-5 accent-stone-500' />

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                Posts
            </div>
            <div className="mx-5 flex ">
                <input type={'checkbox'} onChange={(e) => setHashtag(e.target.checked)} className='w-5 accent-stone-500' />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
                </svg>
                Hashtag
            </div>
        </div>
    )
}