import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "./App.css";
import Header from "./pages/Header";
import Profile from "./pages/Profile";
import System from "./pages/SearchingSystem";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<System />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
