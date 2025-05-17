const express = require('express'); // Using CommonJS – can be converted to modern ESM: import express from 'express'; 
const path = require('path'); // Using CommonJS – can be converted to modern ESM: import path from 'path';
const gameRoutes = require('./routes/game'); // Using CommonJS – can be converted to modern ESM: import gameRoutes from './routes/game.js';

const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    });

 app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public directory   

 gameRoutes(app); // Initialize game routes