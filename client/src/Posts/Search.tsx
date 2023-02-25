import { getAllSavedVideos } from "../Ts_files/posts"

export default function SavedVideos() {
  let email = localStorage.getItem("email")
  if (email) {
    const result = getAllSavedVideos(email)
    return (
      <div>
        <h1>Hello. You can see all your saved videos!</h1>
      </div>
    )
  } else {
    window.location.href = '/login'
    return <div>Hello World</div>
  }
}
