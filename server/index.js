const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");


const app = express();
const port = 4500;

const users = [{}];

app.use(cors());
app.get("/", (req, res) => {
    res.send("Hello ITS WOrKING")
})

const server = http.createServer(app)

const io = socketIO(server);

io.on("connection", (socket) => {
    socket.on('joined', ({ user }) => {
        users[socket.id] = user;
        console.log(`${user} has joined`)
        socket.broadcast.emit('userjoined', { user: "Admin", message: `${users[socket.id]} has joined alredy` })
        socket.emit('welcome', { user: "Admin", message: `Welcome to the chat ${users[socket.id]}` })
    })
    socket.on('message', ({ message, id }) => {
        io.emit('sendMessage', { user: users[id], message, id })
    })


    socket.on('disconnect', () => {
        socket.broadcast.emit('leave', { user: "Admin", message: `${users[socket.id]}User has left` })
    })
})


server.listen(port, () => {
    console.log(`server is working on http://localhost:${port}`);
})