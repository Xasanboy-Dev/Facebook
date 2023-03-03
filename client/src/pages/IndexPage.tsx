import axios from "axios";
import ImagePost from "../Post/ImagePost";
import { useEffect, useState } from "react";
export default function IndexPage() {
  let [arr, setArr] = useState([]);
  let showIcon: boolean = false;
  function show() {
    showIcon = true;
  }
  useEffect(() => {
    axios
      .get("http://localhost:8080/posts")
      .then((res) => {
        setArr(res.data.posts);
      })
      .catch((err) => {
        console.log(err.message);
      });
  })
  return (
    <div className="mx-auto text-center ">
      {arr.map((numbers: any) => (
        <div className="mx-auto rounded-[25px] w-[80%]  m-[50px] border border-dark">
          <ImagePost PostBio={numbers} showPost={show} />
        </div>
      ))}
    </div>
  );
}