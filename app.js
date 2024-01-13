const http = require('http');
const socketIO = require('socket.io');
const app = require("./modules/express");
const { Chat, saveMessage } = require("./modules/chat");
require("./modules/config");
require("./modules/mongodb");

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', async (socket) => {
    const messages = await Chat.find().sort({ _id: -1 }).lean();
    socket.emit('load messages', messages.reverse());

    socket.on('chat message', async (data) => {
        io.emit('chat message', data);
        await saveMessage(data);
    });

    socket.on('image', async (data) => {
        io.emit('image', data);
        await saveMessage(data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
