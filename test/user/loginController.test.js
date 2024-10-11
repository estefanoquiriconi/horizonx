const request = require('supertest');
const app = require('../../app')
const userService = require('../../services/user/index.service')
const bcryptjs = require('bcryptjs');
const { createToken } = require('../../services/security/createToken.service');

jest.mock('../../services/user/index.service');
jest.mock('bcryptjs');
jest.mock('../../services/security/createToken.service');

describe('User login API v2', () => {
    it('should return 400 if validation fails', async () => {
        const res = await request(app)
            .post('/api/v2/users/login')
            .send({});
        expect(res.statusCode).toBe(400);
        expect(res.body.code).toBe('BAD_REQUEST_ERROR')
    });

    it('should return 404 if user not found', async () => {
        const res = await request(app)
            .post('/api/v2/users/login')
            .send({ email: 'test@example.com', password: '123456' });
        expect(res.statusCode).toBe(404);
        expect(res.body.code).toBe('USER_NOT_FOUND')
        expect(res.body.message).toBe('Usuario no encontrado')
    })

    it('should return 401 if password is incorrect', async () => {
        const user = { email: 'test@example.com', password: 'hashedpassword' };
        userService.getByEmail.mockResolvedValue(user);
        bcryptjs.compare.mockResolvedValue(false);
        const res = await request(app)
            .post('/api/v2/users/login')
            .send({ email: 'test@example.com', password: 'wrongpassword' });
        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('Credenciales incorrectas');
    })

    it('should return 200 and token if login is successful', async () => {
        const user = { id: 1, email: 'test@example.com', password: 'hashedpassword', active: true };
        userService.getByEmail.mockResolvedValue(user);
        bcryptjs.compare.mockResolvedValue(true);
        createToken.mockReturnValue('token123');
        const res = await request(app)
            .post('/api/v2/users/login')
            .send({ email: 'test@example.com', password: '123456' });
        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBe('token123');
    });
});