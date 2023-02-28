<<<<<<< HEAD
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
=======
import express from "express";
const PORT = 5000;
const server = express();

server.listen(PORT, () => {
  console.log(`ws://localhost:${PORT}`);
>>>>>>> 6f7af1611922ad0c2aa7128623e9622a822c09cb
});
