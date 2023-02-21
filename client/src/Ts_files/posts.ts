import axios from "axios";
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
