import axios from "axios"
import { useState } from "react"
export default function System() {
    const [one, setIMages] = useState(Boolean)
    const [two, setVideo] = useState(Boolean)
    if (localStorage.getItem('letter')) {
        axios.post(`http://localhost:8080/searching/${localStorage.getItem('letter')}`, { images: one, videos: two })
            .then(res => {
                console.log(res.data)
            })
    }
    return (
        <div className=" bg-blue-500 rounded-lg justify-content-center  items-center flex justify-between">
            <h4 className="text-white">Search by this:</h4>
            <div className="flex p-2">
                <input type={'checkbox'} onChange={(e) => setIMages(e.target.checked)} className='w-5 accent-stone-500' />

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <h4 className="text-white">
                    Images
                </h4>
            </div>
            <div className="flex p-2">
                <input type={'checkbox'} onChange={(e) => setVideo(e.target.checked)} className='w-5 accent-stone-500' />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                    <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <h4 className="text-white">
                    Videos
                </h4>
            </div>
        </div>
    )
}