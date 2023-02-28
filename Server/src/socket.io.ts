import WebSocket from "ws";

const port = 1234;

const object = {
  name: "Xasanboy",
  lastname: "Abdurasulov",
};
const ws = new WebSocket(`ws://localhost:${port}`);
ws.on("open", () => {
  console.log(`Client has connected!`);
  ws.send(JSON.stringify(object));
});

ws.on("message", (data) => {
  console.log(`Recieved message from server:${data}`);
});
