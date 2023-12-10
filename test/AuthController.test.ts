// import supertest from 'supertest';
// // import App from '../src/index';
// import {User} from '../src/models/User';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';

// jest.mock('jsonwebtoken');
// jest.mock('bcrypt');

// describe('AuthController', () => {
//     beforeEach(() => {
//         jest.clearAllMocks();
//     });

//     it('should handle login', async () => {
//         // Mock User.findOne to simulate a user not found scenario
//         jest.spyOn(User, 'findOne').mockResolvedValue(null);

//         const response = await supertest(App)
//             .post('/signin')
//             .send({ username: 'myusufalpian123', password: 'admin' });

//         expect(response.status).toBe(404);
//         expect(response.body).toEqual({ error: 'User not found' });
//     });

//     it('should handle invalid password', async () => {
//         jest.spyOn(User, 'findOne').mockImplementation(() => Promise.resolve({
//             userUsername: 'myusufalpian123',
//         } as any));

//         // Mock bcrypt.compare to simulate an invalid password
//         jest.spyOn(User, 'findOne').mockImplementation(() => Promise.resolve({
//             userUsername: 'myusufalpian',
//         } as any));
//         (bcrypt.compare as jest.Mock) = jest.fn().mockRejectedValue(new Error('Random error'));
//         const response = await supertest(App)
//             .post('/signin')
//             .send({ username: 'myusufalpian', password: 'admin123' });
//         expect(response.status).toBe(401);
//         expect(response.body).toEqual({ error: 'Invalid password' });
//     });

//     it('should handle successful login', async () => {
//         // Mock User.findOne to simulate finding a user
//         jest.spyOn(User, 'findOne').mockImplementation(() => Promise.resolve({
//             userUsername: 'myusufalpian123',
//         } as any));

//         // Mock bcrypt.compare to simulate a valid password
//         (bcrypt.compare as jest.Mock) = jest.fn().mockResolvedValue(true);

//         // Mock jwt.sign to simulate token generation
//         // @ts-ignore
//         jest.spyOn(jwt, 'sign').mockReturnValue('mocked-token');

//         const response = await supertest(App)
//             .post('/signin')
//             .send({ username: 'myusufalpian', password: 'admin' });

//         expect(response.status).toBe(200);
//         expect(response.body).toEqual({ message: 'Login successful', token: 'mocked-token' });
//     });
// });