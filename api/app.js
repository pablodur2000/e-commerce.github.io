const express = require('express');
const cors = require('cors');
const { taskRoutes } = require('./routes');


const app = express();

app.use(cors());

app.use(express.json());

// Example route
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

module.exports = app;