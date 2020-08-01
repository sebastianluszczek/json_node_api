const supertest = require('supertest');

const app = require('../app')

const request = supertest(app);

describe('GET /api/films/ - get all films', () => {
    let response;
    
    beforeAll(async () => {
        response = await request.get('/api/films');
    });


    it('should succed request (status 200)', async () => {

        expect(response.status).toBe(200);
    });

    it('should get array of films responses', async () => {

        expect(response.body.data).toEqual(expect.any(Array))
    });

    it('should get length of array greater than 0', async () => {

        expect(response.body.data.length).toBeGreaterThan(0)
    });
});