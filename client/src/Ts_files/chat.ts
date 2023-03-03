import axios from "axios";


export async function getDataAboutUser(id: number) {
    try {
        const response = await axios.get(`http://localhost:8080/chat/user/${id}`)
        return {
            name: response.data.user.name,
            email: response.data.user.email
        }
    } catch (error: any) {
        console.log(error.message)
        alert("You have some problems!")
        return false
    }
}


export async function getAllUsersForChattingpage() {
    try {
        const id = localStorage.getItem("userID")
        if (!id) {
            return window.location.href = '/login'
        }
        const response = axios.get(`http://localhost:8080/chat/Users`, { headers: { useID: id } })
        if ((await response).status == 200) {
            return (await response).data.users
        }
        else {
            return false
        }
    } catch (error: any) {
        console.log(error.message)
        alert("You have some problems!")
    }
}