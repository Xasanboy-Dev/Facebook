import axios from "axios";
import ImagePost from "../Post/ImagePost";
import { useState } from "react";
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
        <div className="mx-auto text-center">
            {arr.map(numbers =>
                <div className="mx-auto w-[80%]  m-[50px] border border-dark">
                    <ImagePost PostBio={numbers} showPost={show} />
                </div>
            )}
        </div>
    )
}