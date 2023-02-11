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
import IndexPage from "./pages/IndexPage";
import Layot from "./pages/Layout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Layot />}>
          <Route index element={<IndexPage />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
