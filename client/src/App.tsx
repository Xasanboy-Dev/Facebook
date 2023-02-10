import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "./App.css";
import Header from "./pages/Header";
import Profile from "./pages/Profile";
import System from "./pages/SearchingSystem";
import RegisterPage from "./pages/RegisterPage";
import UnderProfile from "./Others/UnderProfileIcon";
import CreatingPost from "./pages/CreatePost";
import Uploading from "./Others/UploadingImage";

function App() {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<Header />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<System />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/system" element={<System />} />
        <Route path="/under" element={<UnderProfile />} />
        <Route path="/createPost" element={<Uploading />} />
      </Routes>
    </div>
  );
}

export default App;
