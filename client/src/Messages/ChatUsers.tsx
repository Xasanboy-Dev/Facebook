import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { useContext, useState } from "react"
import { Context } from "../main"
export default function ChatUser() {
    const { auth } = useContext(Context)
    const user = { name: "Xasanboy", lastname: "Abdurasulov" }
    const [value, setValue] = useState("")
    const [messages, loading] = useCollectionData()
    const sendMessage = async () => {
        console.log(value)
    }

    return (
        <Container>
            <Grid container justify={"center"} style={{ height: window.innerHeight - 50, marginTop: 20 }}>
                <div style={{ width: "80%", height: "60vh", border: "1px solid gray", overflow: "auto" }}></div>
                <Grid container direction={"column"} alignItems={"flex-end"} style={{ width: "80%" }}>
                    <TextField
                        fullWidth
                        rowsMax={2}
                        variant={"outlined"}
                        value={value}
                        onChange={(e: any) => setValue(e.target.value)}
                    />
                    <Button onClick={sendMessage} variant={"outlined"}>Send</Button>
                </Grid>
            </Grid>
        </Container>
    )
}