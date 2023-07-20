const configureSocket = (io, word) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.emit('word', word);
    
    socket.on('word', (clientWord) => {
      console.log('Received word from client:', clientWord);
      socket.broadcast.emit('word', clientWord);
    });

    // if client gets disconnected
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

module.exports = configureSocket;
