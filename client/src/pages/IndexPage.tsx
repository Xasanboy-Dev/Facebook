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
            alert(err.message)
        })
    return (
        <div>
            {arr.map(numbers =>
                <ImagePost PostBio={numbers} showPost={show} />
            )}
        </div>
    )
}