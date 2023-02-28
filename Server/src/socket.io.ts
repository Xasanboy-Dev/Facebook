import express from "express";
const PORT = 5000;
const server = express();

server.listen(PORT, () => {
  console.log(`ws://localhost:${PORT}`);
});
