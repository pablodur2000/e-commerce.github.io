const app = require('./app');

const PORT = process.nextTick.PORT || 5500;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});