const router = require('express').Router();
const path = require('path');

const { readJSONData, writeJSONData } = require('../helpers/readwrite');
const { filmValidator, searchValidator } = require('../helpers/validation')
const search_combinations = require('../helpers/search')

const dataPath = path.join(__dirname, '../..', 'data', 'db.json')

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

        let searched;
        if (duration) {
            const duration_movies = movies.filter(movie => {
                return (parseInt(movie.runtime) >= duration - 10 && parseInt(movie.runtime) <= duration + 10)
            })
            if (search_genres && search_genres.length > 0) {
                // Duration with genres 
                // - return all films in spec. duration (+/- 10 min) that contain specific genres
                searched = search_combinations(duration_movies, search_genres);
            } else {
                // Only duration
                // - return all films in spec. duration (+/- 10 min) 
                searched = duration_movies;
            }
        } else {
            if (search_genres && search_genres.length > 0) {
                // Only genres
                // - return all movies containing specific genres
                searched = search_combinations(movies, search_genres);
            } else {
                // Without duration & genres
                // - return one random movie
                searched = movies[Math.floor(Math.random() * movies.length)];
            }
        }

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