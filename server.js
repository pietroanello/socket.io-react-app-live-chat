import express from "express"
import socket from "socket.io"
import http from "http"

const app = express()
const server = http.createServer(app)
const io = socket(server, {
    pingInterval: 25000,
})

app.use(express.static("react-app/build"))

let connectedUsers = 0

io.on("connection", socket => {
    console.log(`${socket.id} connected`)
    connectedUsers = connectedUsers + 1
    io.emit("userNumber", connectedUsers)
    socket.on("sendMsg", data => {
        io.emit("msgData", data)
    })
    socket.on("disconnect", () => {
        connectedUsers = connectedUsers - 1
        io.emit("userNumber", connectedUsers)
        console.log(`${socket.id} disconnected`)
    })
    socket.on("ping", msg => {
        alert(msg)
    })
})

server.listen("5000", () => {
    console.log("listening on port *:5000")
})
