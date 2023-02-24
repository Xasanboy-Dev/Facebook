import axios from "axios";
import { useState } from "react";
import { Posts } from "./../Ts_files/types";
export async function postLikee(postId: number, email: string) {
  if (!email) {
    alert("You must to login!");
    return (window.location.href = "/login");
  }
  axios
    .post(`http://localhost:8080/post/likee/${postId}`, { email })
    .catch((err) => {
      alert(err.message);
    });
}

export async function postDisLikee(postID: number, email: string) {
  try {
    if (!email) {
      alert("You must to login!");
      return (window.location.href = "/login");
    }
    axios
      .post(`http://localhost:8080/post/dislikee/${postID}`, { email })
      .then((res) => {
        if (res.status == 201) {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  } catch (error: any) {
    console.log(error.message);
    return (window.location.href = "login");
  }
}

export async function saveThePost(
  PostBio: Posts,
  userEmail: string,
  setSaved: (saved: boolean) => void,
  saved: boolean
) {
  try {
    axios
      .post(`http://localhost:8080/user/save/${PostBio.id}`, {
        email: userEmail,
      })
      .then((res) => {
        if (res.status == 201) {
          if (saved) {
            setSaved(false);
            return alert("Unseavd succesfully!");
          }
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  } catch (error: any) {
    console.log(error);
  }
}

export async function writeAcomment(
  letter: string,
  email: string,
  postId: number
) {
  try {
    alert(letter);
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function sendSavedOrUnsaved(userEmail: string, postId: number) {
  const response = await axios.post(`http://localhost:8080/post/checkSaved/${postId}`, { email: userEmail })
  return response.data.message
}
