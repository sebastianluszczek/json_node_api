const express = require('express');
require('dotenv');

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello world')
});

app.use('/api/films', require('./routes/films'));

module.exports = app;