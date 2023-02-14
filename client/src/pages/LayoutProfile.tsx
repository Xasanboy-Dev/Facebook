import { Outlet } from "react-router-dom"
import Profile from "./Profile"
export default function ProfileLayout() {
    return (
        <div>
            <Profile />
            <Outlet />
        </div>
    )
}
