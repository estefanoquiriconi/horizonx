const request = require('supertest');
const app = require('../../app');
const { User } = require('../../database/models');

describe('User Registration API', () => {
  beforeEach(async () => {
    await User.destroy({ where: {}, truncate: true });
  });

  it('should return 400 if validation fails', async () => {
    const res = await request(app)
      .post('/api/v2/users/register')
      .send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.code).toBe('BAD_REQUEST_ERROR')
  });

  it('should register a new user successfully', async () => {
    const response = await request(app)
      .post('/api/v2/users/register')
      .send({
        firstName: 'Estéfano',
        lastName: 'Quiriconi',
        email: 'estefanoquiriconi@gmail.com',
        password: 'password123',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.message).toBe('Usuario registrado con éxito.');

    const user = await User.findOne({ where: { email: 'estefanoquiriconi@gmail.com' } });
    expect(user).toBeTruthy();
    expect(user.first_name).toBe('Estéfano');
    expect(user.last_name).toBe('Quiriconi');
  });

  it('should return error if the email is already registered', async () => {
    await User.create({
      first_name: 'Estéfano',
      last_name: 'Quiriconi',
      email: 'estefanoquiriconi@gmail.com',
      password: 'password123',
      role_id: 2,
    });

    const response = await request(app)
      .post('/api/v2/users/register')
      .send({
        firstName: 'Estéfano',
        lastName: 'Quiriconi',
        email: 'estefanoquiriconi@gmail.com',
        password: 'password123',
      });

    expect(response.statusCode).toBe(409);
    expect(response.body.code).toBe('CONFLICT')
    expect(response.body.message).toBe('El email ya está registrado.');
  });
});
