const app = require('./src/app');
require('dotenv/config');

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST, () => {
    console.log(`Service started on http://${HOST}:${PORT}`)
})