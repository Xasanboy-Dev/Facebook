import axios from "axios";
import { Posts, User } from "./../Ts_files/types";
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
  const response = await axios.post(
    `http://localhost:8080/post/checkSaved/${postId}`,
    { email: userEmail }
  );
  return response.data.message;
}

export async function addComment(
  postID: number,
  email: string,
  letter: string
) {
  if (!email || !letter || !postID) {
    alert("You must to login!");
    return (window.location.href = "/login");
  }
  const response = await axios.post(`http://localhost:8080/comment/${postID}`, {
    email,
    letter,
  });
  if (response.status == 200) {
    alert(response.data.message);
    return;
  }
  return alert(response.data.message);
}

export async function deleteComment(
  postId: number,
  commentID: number,
  email: string
) {
  try {
    const result = await axios.delete(
      `http://localhost:8080/comment/${commentID}`,
      { headers: { Authorization: email } }
    );
    console.log(result.data);
  } catch (error: any) {
    alert(error.message);
  }
}

export async function getAllSavedVideos(email: string) {
  try {
    const result = await axios.get("http://localhost:8080/post/savePosts", {
      headers: { Authorization: email },
    });
    if (result.data) {
      return await result.data.posts;
    } else {
      return "Not given";
    }
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
}

export async function deletePost(post: Posts, user: User) {
  try {
    axios
      .delete(`http://localhost:8080/post/${post.id}`, {
        headers: { Authorization: user.email },
      })
      .then((res) => {
        if (res.status == 200) {
          alert("Deleted succesfully!");
          return (window.location.href = window.location.href);
        } else {
          alert("You have some problems!");
        }
      })
      .catch((err) => {
        console.log(err.mesage);
      });
  } catch (error: any) {
    return (window.location.href = "/login");
  }
}

export async function getAllVideosByUserId(id: number) {
  try {
    if (!id) {
      return;
    }
    const response = await axios.get(`http://localhost:8080/post/videos/${id}`);
    return response.data.videos;
  } catch (error: any) {
    alert(error.mesage);
  }
}

export async function getAllPhotosByUserId(id: number) {
  try {
    if (!id) {
      return false;
    }
    const response = await axios.get(`http://localhost:8080/post/photos/${id}`);
    return response.data;
  } catch (error: any) {
    return false;
  }
}

export async function getAllLikedVideos(userID: number) {
  try {
    const response = await axios.get(
      `http://localhost:8080/user/liked/${userID}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error.mesage);
    return false;
  }
}
