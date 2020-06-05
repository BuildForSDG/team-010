import request from 'supertest';
import app from '../src/app';
import database from '../src/models/index';

/**
   * Test User Endpoints
   */
describe('{GET/POST} Test user signup/signin', () => {
/**
   * POST /auth/signup endpoint
   */
  it('Should signup a new user', async (done) => {
    const response = await request(app).post('/api/v1/auth/signup').send({
      firstName: 'Rasak',
      middleName: 'Agbolade',
      lastName: 'Adeniyi',
      userType: 'admin',
      role: 'admin',
      email: 'raadeniyi22@gmail.com',
      phone: '7031059595',
      password: 'test1234',
      confirmPassword: 'test1234'
    }).expect(201);

    const { body: { data } } = response;

    // Assert that the database was changed correctly
    const { dataValues } = await database.User.findOne({ where: { email: data.email } });
    expect(dataValues).not.toBeNull();

    // Assertions about the response
    expect(dataValues).toHaveProperty('firstName', 'Rasak');
    expect(dataValues).toHaveProperty('middleName', 'Agbolade');
    expect(dataValues).toHaveProperty('lastName', 'Adeniyi');
    expect(dataValues).toHaveProperty('role', 'admin');
    expect(dataValues).toHaveProperty('userType', 'admin');
    expect(dataValues).toHaveProperty('email', 'raadeniyi22@gmail.com');
    expect(dataValues).toHaveProperty('phone', '7031059595');
    expect(dataValues.password).not.toBe('unencryptedPassword');
    done();
  });

  // it('Should login existing user', async (done) => {
  //   const response = await request(app).post('/api/v1/auth/signin').send({
  //     email: 'raadeniyi22@gmail.com',
  //     password: 'test1234'
  //   }).expect(200);

  //   expect(response.body).toHaveProperty('token');
  //   done();
  // });
});
