const router = require('express').Router();
const path = require('path');

const { readJSONData, writeJSONData } = require('../helpers/readwrite');
const { filmValidator, searchValidator } = require('../helpers/validation')
const search_algorithm = require('../helpers/search');
const { ErrorHandler } = require('../helpers/errors');
const { nextTick } = require('process');

const dataPath = path.join(__dirname, '../..', 'data', process.env.JSON_FILE)

router.get('/', async (req, res, next) => {
    try {
        const { movies } = await readJSONData(dataPath);
        if (!movies) {
            throw new ErrorHandler(500, 'No movies')
        }
        res.json({ 
            status: 'succes',
            data: movies 
        })

    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        console.log(dataPath);
        const { movies, genres } = await readJSONData(dataPath);
        const { error } = filmValidator(req.body.data, genres);
        if (error) {
            throw new ErrorHandler(400, error.details[0].message)
        }

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

        res.status(201).json({ 
            status: 'succes',
            data: movies 
        })

    } catch (error) {
        next(error)
    }
});

router.post('/search', async (req, res, next) => {
    try {
        const { movies, genres } = await readJSONData(dataPath);
        const { error } = searchValidator(req.body.data, genres);
        if (error) {
            throw new ErrorHandler(400, error.details[0].message)
        }
        const duration = parseInt(req.body.data.duration);
        const search_genres = req.body.data.genres;

        const searched = search_algorithm(movies, search_genres, duration);

        res.json({
            status: 'succes',
            data: {
                count: searched.length,
                searched
            }
        })
    } catch (error) {
        next(error)
    }
})


module.exports = router;