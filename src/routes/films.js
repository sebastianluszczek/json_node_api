const router = require('express').Router();
const path = require('path');

const { readJSONData, writeJSONData } = require('../helpers/readwrite');
const { filmValidator, searchValidator } = require('../helpers/validation')
const search_algorithm = require('../helpers/search')

const dataPath = path.join(__dirname, '../..', 'data', process.env.JSON_FILE)

router.get('/', async (req, res) => {
    try {
        const { movies } = await readJSONData(dataPath);
        res.json({ data: movies })

    } catch (error) {
        res.status(500).json({
            succes: false,
            error: {
                message: error
            }
        })
    }
})

router.post('/', async (req, res) => {
    try {
        console.log(dataPath);
        const { movies, genres } = await readJSONData(dataPath);
        const { error } = filmValidator(req.body.data, genres);
        if (error) return res.status(400).json({
            succes: false,
            error: {
                message: error.details[0].message
            }
        });

        const newMovie = {
            id: movies.length + 1,
            ...req.body.data
        }

        movies.push(newMovie)
        const data = {
            genres,
            movies
        }

        await writeJSONData(dataPath, data);

        res.status(201).json({ data: movies })

    } catch (error) {
        res.status(500).json({
            succes: false,
            error: {
                message: error
            }
        })
    }
});

router.post('/search', async (req, res) => {
    try {
        const { movies, genres } = await readJSONData(dataPath);
        const { error } = searchValidator(req.body.data, genres);
        if (error) return res.status(400).json({
            succes: false,
            error: {
                message: error.details[0].message
            }
        });
        const duration = parseInt(req.body.data.duration);
        const search_genres = req.body.data.genres;

        const searched = search_algorithm(movies, search_genres, duration);

        res.json({
            succes: true,
            data: {
                count: searched.length,
                searched
            }
        })
    } catch (error) {
        res.status(500).json({
            succes: false,
            error: {
                message: error
            }
        })
    }
})


module.exports = router;