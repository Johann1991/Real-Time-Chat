// Import the required modules
const express = require('express');  // Express is a web application framework
const http = require('http');         // Node.js built-in HTTP module
const socketIO = require('socket.io'); // Socket.io for real-time communication

// Initialize an Express application
const app = express();

// Create an HTTP server and pass the Express app as middleware
const server = http.createServer(app);

// Initialize Socket.io to listen to the server.
// Configure CORS to allow requests from our Angular development server.
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:4200",  // Allow connections from the Angular dev server running on this port
    methods: ["GET", "POST"]          // Allow GET and POST HTTP methods from the origin
  }
});

// Event triggered when a new client connects to the Socket.io server
io.on('connection', (socket) => {
  console.log('New client connected');  // Log when a new client connects

  // Listen for a 'message' event from the client
  socket.on('message', (message) => {
    io.emit('message', message);  // Broadcast the message to all connected clients
  });

  // Listen for a 'disconnect' event
  socket.on('disconnect', () => {
    console.log('Client disconnected');  // Log when a client disconnects
  });
});

// Make the server listen on port 3000
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');  // Log the URL where the server can be accessed
});
