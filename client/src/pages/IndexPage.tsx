import axios from "axios";
import ImagePost from "../Post/ImagePost";
import { useState } from "react";
import { Posts } from "../Ts_files/types";
export default function IndexPage() {
    let [arr, setArr] = useState([])
    let showIcon: boolean = false
    function show() {
        showIcon = true
    }

    axios.get('http://localhost:8080/posts', { headers: { Authorization: localStorage.getItem('email') } })
        .then(res => {
            setArr(res.data.posts)
        }).catch(err => {
            console.log(err.message)
        })
    return (
        <div className=" grid grid-cols-3  ">
            {arr.map((numbers: Posts) =>
                <div className="">
                    <ImagePost PostBio={numbers} showPost={show} />
                </div>
            )}
        </div>
    )
}