const express = require('express');

const app = express();

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || '0.0.0.0';

app.get('/', (req, res) => {
    res.send('Hello world')
});

app.listen(PORT, HOST, () => {
    console.log(`Service started on http://${HOST}:${PORT}`)
})