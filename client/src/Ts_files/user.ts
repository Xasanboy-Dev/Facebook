import axios from "axios"
export async function getDataOfUser(email: string) {
    try {
        const result = await axios.get(`http://localhost:8080/user/${email}`)
        if (result.status !== 200) {
            window.location.href = '/login'
            return false
        }
        return result.data.user
    } catch (error: any) {
        alert(error.message)
        return false
    }
}