import { Outlet } from "react-router-dom"
import UserMessages from "./Message"
export default function Messages() {
    return (
        <div>
            <UserMessages />
            <Outlet />
        </div>
    )
}