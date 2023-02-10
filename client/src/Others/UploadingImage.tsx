export default function Uploading() {
    return (
        <form method="POST" action="http://localhost:8080/post/image" encType="multipart/form-data">
            <input type="file" name="Image" />
            <input type="submit" value={"Click on me"} />
        </form>
    )
}