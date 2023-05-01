const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const { Server } = require("socket.io");
const io = new Server(server);

const port = 8000 || process.env.PORT;
app.use(express.static(path.join(__dirname + "/public")))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (msg) => {
        console.log('message: ' + msg.name);
        socket.broadcast.emit('message' ,msg)
      });

  });

server.listen(port, () => {
  console.log('listening on *:80');
});