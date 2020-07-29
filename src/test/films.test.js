const supertest = require('supertest');

const app = require('../app')

const request = supertest(app);

describe('films API test', () => {


    it('should be able to get films', async () => {
        const response = await request.get('/api/films');

        expect(response.status).toBe(200);
    });
});