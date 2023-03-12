const { Server } = require('socket.io');
const io = new Server();

function setupSocket(server) {
  io.attach(server);

  io.on('connection', (socket) => {
    console.log(`Client ${socket.id} connected...`);

    socket.on('new message', async (data) => {
        try {
            const { email, message } = data;
            const chat = await Manager.postChat(email, message);
            io.emit('new message', chat);
        } catch (error) {
            console.error('Error saving chat message:', error);
        }
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected.');
    });
  });
}

module.exports = { setupSocket, io };