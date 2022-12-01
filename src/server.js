import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "\\public\\views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);

const wss = new WebSocket.Server({server});

wss.on("connection", (socket) => {
    socket.on("close", () => console.log("Disconnected from the client"));
    socket.on("message", (message) => console.log(message.toString()));
    socket.send("hello!");
});

server.listen(3000, handleListen);