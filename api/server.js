const express = require('express');
const cors = require('cors')
const { logger } = require('./actions/actions-middlware')

const server = express();

server.use(express.json())
server.use(cors)
server.use(logger)

server.use('/api')

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
