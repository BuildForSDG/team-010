import request from 'supertest';
import app from '../src/app';
// import database from '../src/models/index';


describe('app module', () => {
  it('it exists', async () => {
    expect(app).toBeDefined();
  });

  it('It should respond the GET method', async (done) => {
    const response = await request(app).get('/');
    const { statusCode } = response;
    expect(statusCode).toBe(200);
    done();
  });
});

/**
   * Test for 404
   */
describe('GET/POST for unavailable routes', () => {
  it('it should return 404 for unavailable routes', async (done) => {
    const response = await request(app).get('/invalid-route');
    expect(response.status).toBe(404);
    expect(response).toHaveProperty('error');
    done();
  });
});
