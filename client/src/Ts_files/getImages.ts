import axios from "axios";
export async function getImages(email: string) {
  try {
    axios.get(`http://localhost:8080/images/${email}.png`).then((res) => {
      return email;
    });
  } catch (error: any) {
    return false;
  }
}
