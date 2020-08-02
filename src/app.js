const express = require('express');
require('dotenv').config();

const { handleError } = require('../src/helpers/errors');

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello world')
});

app.use('/api/films', require('./routes/films'));

app.use((err, req, res, next) => {
    handleError(err, res);
});

module.exports = app;