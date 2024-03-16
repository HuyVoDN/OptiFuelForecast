import request from 'supertest';
import { app, server } from '../index.js'; // import your express app
import { db, closeConnection } from '../db.js'; // import your db connection
import bcrypt from 'bcrypt';
import {register, login, logout} from '../controllers/authController.js';

jest.mock('../db');

describe('Auth Controllers', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    afterAll(() => {
        closeConnection();
    });
    describe('register', () => {
        it('should register a new user', async () => {
          const mockUser = {
            email: 'test@gmail.com',
            username: 'testuser',
            password: bcrypt.hashSync('password', 10),
          };
      
          const req = {
            body: mockUser,
          };
      
          const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
            send: jest.fn(),
          };
      
          db.query.mockImplementation((query, values, callback) => {
            if (query.includes('SELECT * FROM OptiFuelForecast.Users WHERE email = ?')) {
              callback(null, []);
            } else if (query.includes('INSERT INTO OptiFuelForecast.Users')) {
              callback(null, { insertId: 1 });
            }
          });
      
          await register(req, res);
      
          expect(res.status).toHaveBeenCalledWith(201);
          expect(res.send).toHaveBeenCalledWith('User has been registered successfully.');
        });
      
        it('should return 409 if user already exists', async () => {
          const mockUser = {
            email: 'test@gmail.com',
            username: 'testuser',
            password: bcrypt.hashSync('password', 10),
          };
      
          const req = {
            body: mockUser,
          };
      
          const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
            send: jest.fn(),
          };
      
          db.query.mockImplementation((query, values, callback) => {
            if (query.includes('SELECT * FROM OptiFuelForecast.Users WHERE email = ?')) {
              callback(null, [mockUser]);
            }
          });
      
          await register(req, res);
      
          expect(res.status).toHaveBeenCalledWith(409);
          expect(res.json).toHaveBeenCalledWith('User already exists');
        });
    });
    describe('login', () => {
        it('should log in a user', async () => {
          const mockUser = {
            email: 'test@gmail.com',
            username: 'testuser',
            password: bcrypt.hashSync('password', 10),
            firstname: 'Test',
            lastname: 'User',
          };
      
          const req = {
            body: {
              email: 'test@gmail.com',
              password: 'password',
            },
          };
      
          const res = {
            cookie: jest.fn(),
            status: jest.fn(() => res),
            json: jest.fn(),
            send: jest.fn(),
          };
      
          db.query.mockImplementation((query, values, callback) => {
            if (query.includes('SELECT * FROM OptiFuelForecast.Users WHERE email = ?')) {
              callback(null, [mockUser]);
            }
          });
      
          await login(req, res);
      
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            message: "User has been logged in successfully",
            username: mockUser.username,
            firstname: mockUser.firstname,
            lastname: mockUser.lastname,
          }));
          expect(res.cookie).toHaveBeenCalledWith('token', expect.any(String), {httpOnly: true, sameSite: 'strict'});
        });
      
        it('should return 404 if user does not exist', async () => {
          const req = {
            body: {
              email: 'test@gmail.com',
              password: 'password',
            },
          };
      
          const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
          };
      
          db.query.mockImplementation((query, values, callback) => {
            if (query.includes('SELECT * FROM OptiFuelForecast.Users WHERE email = ?')) {
              callback(null, []);
            }
          });
      
          await login(req, res);
      
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.json).toHaveBeenCalledWith('User does not exist');
        });
      
        it('should return 401 if password is invalid', async () => {
          const mockUser = {
            email: 'test@gmail.com',
            username: 'testuser',
            password: bcrypt.hashSync('wrongpassword', 10),
          };
      
          const req = {
            body: {
              email: 'test@gmail.com',
              password: 'password',
            },
          };
      
          const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
          };
      
          db.query.mockImplementation((query, values, callback) => {
            if (query.includes('SELECT * FROM OptiFuelForecast.Users WHERE email = ?')) {
              callback(null, [mockUser]);
            }
          });
      
          await login(req, res);
      
          expect(res.status).toHaveBeenCalledWith(401);
          expect(res.json).toHaveBeenCalledWith('Invalid password.');
        });
    });

    describe('logout', () => {
        it('should log out a user', () => {
          const req = {};
      
          const res = {
            clearCookie: jest.fn(),
            status: jest.fn(() => res),
            json: jest.fn(),
          };
      
          logout(req, res);
      
          expect(res.clearCookie).toHaveBeenCalledWith('token', {httpOnly: true, sameSite: 'strict'});
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith({ message: "User has been logged out successfully." });
        });
      });
});