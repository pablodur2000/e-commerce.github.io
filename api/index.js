const express = require('express');
const cors = require('cors');
const { router } = require('./routes');

const app = express();

app.use(cors());

app.use("/api", router);

app.use(express.json());

const PORT = process.nextTick.PORT || 5500;


// Example route
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});