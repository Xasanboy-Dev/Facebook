import { Outlet } from "react-router-dom"
import UserMessages from "./../Messages/ChatUsers"
export default function Messages() {
    return (
        <div>
            <UserMessages />
            <Outlet />
        </div>
    )
}