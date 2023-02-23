import axios from "axios";
import { Posts } from "./../Ts_files/types";
export async function postLikee(postId: number, email: string) {
  if (!email) {
    alert("You must to login!");
    return (window.location.href = "/login");
  }
  axios
    .post(`http://localhost:8080/post/likee/${postId}`, email)
    .then((res) => {
      alert(res.status);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

export async function saveThePost(PostBio: Posts, userEmail: string) {
  try {
    axios
      .post(`http://localhost:8080/user/save/${PostBio.id}`, {
        email: userEmail,
      })
      .then((res) => {
        if (res.status == 201) {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (error: any) {
    console.log(error);
  }
}
