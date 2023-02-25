import axios from "axios"
import { useEffect, useState } from "react";
import Hamburger from "../Settings/services";
import { deleteComment } from "../Ts_files/posts";
import { Posts, Comments } from "./../Ts_files/types";
export default function CommentOfPost({ bool, setShowCooment, POST }: { bool: boolean, POST: Posts, setShowCooment: (show: boolean) => void }) {
    let [arr, setArr] = useState([])
    if (bool) {
        axios.get(`http://localhost:8080/comment/${POST.id}`)
            .then(res => {
                setArr(res.data.comment)
            })
            .catch(error => {
                alert(error.message)
            })
    }
    if (arr.length !== 0) {
        let show = false
        async function setShow(bool: boolean) {
            show = true
        }
        return (
            <div className="border shadow-xl border-dark w-[90%] h-full rounded p-2">
                <button onClick={() => setShowCooment(false)} className={'flex justify-start'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                {arr.map((comment: Comments) => {
                    async function alertDelete() {
                        let answer = confirm("Do you want to delete?")
                        if (answer) {
                            const result = await deleteComment(comment.postId, comment.id, localStorage.getItem("email")!)
                        }
                    }

                    return <div className=" flex justify-content-center text-light cursor-pointer">
                        <div className=" inline-flex justify-content-center">
                            <h4 className="mx-5 border p-2 mt-2 rounded-2xl text-light cursor-pointer bg-green-900 border-light  inline-flex justify-content-center text-xl">{comment.texts}
                                <div> <svg style={{ display: localStorage.getItem("email") ? 'flex' : "none" }} onClick={() => alertDelete()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                </div></h4>
                        </div>
                        <div className=" text-light">
                        </div>
                        <div style={{ display: show ? "flex" : 'none' }}>
                            <Hamburger />
                        </div>
                    </div>
                })}
            </div>
        )
    } else {
        return (
            <div className="shadow-xl border border-dark w-[90%] h-full rounded p-2">
                <button onClick={() => setShowCooment(false)} className={'flex justify-start'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                <div>
                    <h1 className="text-bold text-xl p-2">There haven't got any comments!</h1>
                </div>
            </div>
        )
    }
}