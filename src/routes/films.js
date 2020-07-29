const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../..', 'data', 'db.json')

router.get('/', (req, res) => {
    fs.readFile(dataPath, "utf8", (err, raw_data) => {
        if (err) throw err;

        const data = JSON.parse(raw_data)

        res.json({data: data.movies});
    });
})


module.exports = router;