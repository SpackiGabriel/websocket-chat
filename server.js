const express = require('express')
const app = express()

app.use(express.static('public'))

const http = require('http').Server(app)
const socketServer = require('socket.io')(http)


const port = 8000

http.listen(port, () => {
    console.log('Server lintening in http://localhost:' + port)
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html') 
})


socketServer.on('connection',  (socket) => {
    socket.on('login_msg', (nickname) => {
        console.log('Conected client: ' + nickname)
        socketServer.emit('chat_msg', `${nickname} has joined the chat. Say hi!`)
        socket.nickname = nickname
    })

    socket.on('chat_status', (msg) => {
        socket.broadcast.emit('chat_status', msg)
    })

    socket.on('chat_msg', (msg) => {
        console.log(`Received message from ${socket.id}: ${msg}`)
        socketServer.emit('chat_msg', `${socket.nickname}: ${msg}`)
    })
})