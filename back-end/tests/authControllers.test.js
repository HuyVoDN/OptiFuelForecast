const request = require('supertest');
const { register, login, logout } = require('../controllers/authController.js');
const { db, closeConnection } = require('../db.js');
const bcrypt = require('bcryptjs');
const express = require('express');

jest.mock('../db.js'); // Mock the db module
describe('Test for authController', () => {

  afterEach(() => {
    jest.resetAllMocks();
});

afterAll(() => {
    closeConnection();
});
  describe('login function', () => {
    let app;
  
    beforeEach(() => {
      app = express();
      app.use(express.json());
      app.post('/login', login);
    });
  
    afterEach(() => {
      jest.clearAllMocks(); // Clear all mocks after each test
    });
  
    test('should login an existing user', async () => {
      const password = 'password';
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
  
      db.query.mockImplementation((query, values, callback) => {
        if (query.startsWith('SELECT')) {
          callback(null, [{ email: 'test@test.com', password: hash }]); // Mock existing user
        }
      });
  
      const response = await request(app)
        .post('/login')
        .send({ email: 'test@test.com', password: password });
  
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User has been logged in successfully');
    });
  
    test('should not login a non-existing user', async () => {
      db.query.mockImplementation((query, values, callback) => {
        if (query.startsWith('SELECT')) {
          callback(null, []); // Mock no existing user
        }
      });
  
      const response = await request(app)
        .post('/login')
        .send({ email: 'test@test.com', password: 'password' });
  
      expect(response.status).toBe(404);
      expect(response.body).toBe('User does not exist');
    });
  
    test('should not login a user with wrong password', async () => {
      const password = 'password';
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
  
      db.query.mockImplementation((query, values, callback) => {
        if (query.startsWith('SELECT')) {
          callback(null, [{ email: 'test@test.com', password: hash }]); // Mock existing user
        }
      });
  
      const response = await request(app)
        .post('/login')
        .send({ email: 'test@test.com', password: 'wrongpassword' });
  
      expect(response.status).toBe(401);
      expect(response.body).toBe('Invalid password.');
    });
  
    test('should handle database errors', async () => {
      db.query.mockImplementation((query, values, callback) => {
        callback(new Error('Database error')); // Mock database error
      });
  
      const response = await request(app)
        .post('/login')
        .send({ email: 'test@test.com', password: 'password' });
  
      expect(response.status).toBe(500);
      expect(response.text).toBe('Error in server');
    });
  });

  describe('register function', () => {
    let app;
  
    beforeEach(() => {
      app = express();
      app.use(express.json());
      app.post('/register', register);
    });
  
    afterEach(() => {
      jest.clearAllMocks(); // Clear all mocks after each test
    });
  
    test('should register a new user', async () => {
      db.query.mockImplementation((query, values, callback) => {
        if (query.startsWith('SELECT')) {
          callback(null, []); // Mock no existing user
        } else if (query.startsWith('INSERT')) {
          callback(null, { insertId: 1 }); // Mock successful insert
        }
      });
  
      const response = await request(app)
        .post('/register')
        .send({ email: 'test@test.com', username: 'test', password: 'password' });
  
      expect(response.status).toBe(201);
      expect(response.text).toBe('User has been registered successfully.');
    });
  
    test('should not register an existing user', async () => {
      db.query.mockImplementation((query, values, callback) => {
        if (query.startsWith('SELECT')) {
          callback(null, [{ email: 'test@test.com' }]); // Mock existing user
        }
      });
  
      const response = await request(app)
        .post('/register')
        .send({ email: 'test@test.com', username: 'test', password: 'password' });
  
      expect(response.status).toBe(409);
      expect(response.body).toBe('User already exists');
    });
  
    test('should handle database errors', async () => {
      db.query.mockImplementation((query, values, callback) => {
        callback(new Error('Database error')); // Mock database error
      });
  
      const response = await request(app)
        .post('/register')
        .send({ email: 'test@test.com', username: 'test', password: 'password' });
  
      expect(response.status).toBe(500);
      expect(response.text).toBe('Error in server');
    });
  });

  describe('logout function', () => {
    let app;
  
    beforeEach(() => {
      app = express();
      app.use(express.json());
      app.post('/logout', logout);
    });
  
    test('should logout a user', async () => {
      const response = await request(app).post('/logout');
  
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User has been logged out successfully.');
      expect(response.headers['set-cookie']).toContainEqual(expect.stringContaining('token=;')); // Check that the cookie has been cleared
    });
  });
});
