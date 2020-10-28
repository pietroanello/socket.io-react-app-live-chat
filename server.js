import express from "express"
import socket from "socket.io"
import http from "http"

const app = express()
const server = http.createServer(app)
const io = socket(server)

app.use(express.static("react-app/build"))

io.on("connection", socket => {
    console.log(`${socket.id} connected`)
    socket.on("sendData", data => {
        console.log(`Name: ${data}`)
    })
    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`)
    })
})

server.listen("5000", () => {
    console.log("listening on port *:5000")
})
