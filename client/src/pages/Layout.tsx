import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layot() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}