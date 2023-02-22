import axios from "axios";
import { Posts, User } from "./../Ts_files/types"
export async function postLikee(postId: number) {
  axios
    .post(`http://localhost:8080/post/likee/${postId}`)
    .then((res) => {
      alert(res.status);
    })
    .catch((err) => {
      console.log(err.message);
    });
}


export async function saveThePost(PostBio: Posts, userEmail: string) {
  try {

    axios.post(`http://localhost:8080/user/save/${PostBio.id}`, { email: userEmail })
      .then(res => {
        if (res.status == 201) {
          console.log(res.data.message)
        }
      })
      .catch(err => {
        console.log(err.message)
      })

  } catch (error: any) {
    console.log(error)
  }
}