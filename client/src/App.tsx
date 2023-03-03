import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import IndexPage from "./pages/IndexPage";
import Layot from "./pages/Layout";
import { Publics } from "./Posts/publics";
import ProfileLayout from "./pages/LayoutProfile";
import Videos from "./Posts/Videos";
import Photos from "./Posts/Photos";
import Friends from "./Posts/Friends";
import Information from "./Posts/Information";
import ClickOnLikes from "./Posts/ClickOnLikes";
import SavedVideos from "./Posts/SavedPosts";
import POSTS from "./Post/postVideo_and_Photo";
import ChatUser from "./Messages/ChatUsers";
import User from "./Messages/User"
function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/post" element={<POSTS />} />
        <Route path="/messages" element={<User />} />
        <Route path="/messages/chat" element={<ChatUser />} />
        <Route path="/" element={<Layot />}>
          <Route index element={<IndexPage />} />
          <Route path="/profile" element={<ProfileLayout />}>
            <Route index element={<Publics />} />
            <Route path="/profile/videos" element={<Videos />} />
            <Route path="/profile/photos" element={<Photos />} />
            <Route path="/profile/friends" element={<Friends />} />
            <Route path="/profile/information" element={<Information />} />
            <Route path="/profile/likes" element={<ClickOnLikes />} />
            <Route path="/profile/saved" element={<SavedVideos />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
