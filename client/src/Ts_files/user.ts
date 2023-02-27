import axios from "axios";
import { User } from "../Ts_files/types";
export async function getDataOfUser(email: string) {
  try {
    const result = await axios.get(`http://localhost:8080/user/${email}`);
    if (result.status !== 200) {
      window.location.href = "/login";
      return false;
    }
    return result.data.user;
  } catch (error: any) {
    alert(error.message);
    return (window.location.href = "/login");
  }
}
export async function editUserData(
  User: User,
  name: string,
  lastname: string,
  email: string,
  phoneNumber: string,
  address: string,
  country: string,
  bio: string
) {
  if (
    User.name !== name ||
    User.lastname !== lastname ||
    User.email !== email ||
    User.phoneNumber !== phoneNumber ||
    User.address !== address ||
    User.Country !== country ||
    User.Bio !== bio
  ) {
    const data = await axios.put(`http://localhost:8080/user/${User.email}`, {
      name,
      lastname,
      email,
      phoneNumber,
      address,
      Country: country ? country : "Uzbekistan",
      description: bio,
    });
    if (data.status !== 201) {
      return { status: 404, text: data.data.message };
    } else {
      localStorage.setItem("email", email);
      localStorage.setItem("name", name);
      return { status: 201, text: data.data.message };
    }
  } else {
    return {
      status: 404,
      text: "Your data is already taken. Please select another one!",
    };
  }
}

export async function getUsrById(userId: number) {
  try {
    const response = await axios.get(`http://localhost:8080/user/id/${userId}`);
    if (response.status !== 200) {
      return (window.location.href = "/login");
    }
    return response.data.user;
  } catch (error: any) {
    return (window.location.href = "/login");
  }
}
