const supertest = require('supertest');
const path = require('path')
const search_algorithm = require('../helpers/search');
const { readJSONData, writeJSONData } = require('../helpers/readwrite');
const app = require('../app');
require('dotenv').config();
const testPath = path.join(__dirname, '../..', 'data', process.env.JSON_FILE);
const fs = require('fs').promises;

const request = supertest(app);

describe('GET /api/films/ - get all films', () => {
    let response;

    beforeAll(async () => {
        await fs.copyFile(path.join(__dirname, '../..', 'data', 'db.json'), testPath);
        response = await request.get('/api/films');
    });

    it('should succed request (status 200)', () => {
        expect(response.status).toBe(200);
    });

    it('should get array of films responses', () => {
        expect(response.body.data).toEqual(expect.any(Array))
    });

    it('should get length of array greater than 0', () => {
        expect(response.body.data.length).toBeGreaterThan(0)
    });

    afterAll(async () => {
        await fs.unlink(testPath);
    });
});

describe('POST /api/films/ - add new film', () => {
    let response;

    beforeAll(async () => {
        await fs.copyFile(path.join(__dirname, '../..', 'data', 'db.json'), testPath);
        response = await request.post('/api/films').send({
            data: {
                title: "Valkyrie",
                year: "2008",
                runtime: "121",
                genres: ["Drama", "History", "Thriller"],
                director: "Bryan Singer",
                actors: "Tom Cruise, Kenneth Branagh, Bill Nighy, Tom Wilkinson",
                plot: "A dramatization of the 20 July assassination and political coup plot by desperate renegade German Army officers against Hitler during World War II.",
                posterUrl: "http://ia.media-imdb.com/images/M/MV5BMTg3Njc2ODEyN15BMl5BanBnXkFtZTcwNTAwMzc3NA@@._V1_SX300.jpg"
            }
        });
    });

    it('should succed request (status 201)', async () => {
        expect(response.status).toBe(201);
    });

    afterAll(async () => {
        await fs.unlink(testPath);
    });
});


describe('search atgorithm test', () => {
    let movies;
    beforeAll(async () => {
        await fs.copyFile(path.join(__dirname, '../..', 'data', 'db.json'), testPath);
        const data = await readJSONData(testPath);
        movies = data.movies;
    })
    it('should return array', async () => {
        const search_genres = ["Crime", "Drama", "Thriller"];
        const duration = "120";
        const searched = search_algorithm(movies, search_genres, duration);
        expect(searched).toEqual(expect.any(Array))
    });
    it('should return one random movie id not duration & genres', async () => {
        const search_genres = [];
        const duration = null;
        const searched = search_algorithm(movies, search_genres, duration);
        expect(searched.length).toBe(1)
    });

    afterAll(async () => {
        await fs.unlink(testPath);
    });
})