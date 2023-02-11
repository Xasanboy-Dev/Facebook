import axios from "axios";

export default function IndexPage() {
    axios.get('https://localhost:8080/posts')
        .then(res => {
            console.log(res.data)
        })
    return (
        <div>
            <div className="border">
                <h1>Hello This is a Index Page</h1>
            </div>
        </div>
    )
}