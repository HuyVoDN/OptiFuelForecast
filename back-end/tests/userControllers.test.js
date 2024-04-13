const request = require('supertest');
const { userData, userUpdater } = require('../controllers/usersController.js');
const { db, closeConnection } = require('../db.js');
const express = require('express');

jest.mock('../db.js'); // Mock the db module

describe('Test for usersController', () => {
  
    afterEach(() => {
      jest.resetAllMocks();
    });
  
    afterAll(() => {
      closeConnection();
    });

    describe('userData function', () => {
      let app;
    
      beforeEach(() => {
        app = express();
        app.use(express.json());
        app.get('/user/:username', userData);
      });
    
      afterEach(() => {
        jest.clearAllMocks(); // Clear all mocks after each test
      });
    
      test('should return user data for an existing user', async () => {
        const mockUser = { username: 'test', email: 'test@test.com' };
    
        db.query.mockImplementation((query, values, callback) => {
          if (query.startsWith('SELECT')) {
            callback(null, [mockUser]); // Mock existing user
          }
        });
    
        const response = await request(app).get('/user/test');
    
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUser);
      });
    
      test('should not return user data for a non-existing user', async () => {
        db.query.mockImplementation((query, values, callback) => {
          if (query.startsWith('SELECT')) {
            callback(null, []); // Mock no existing user
          }
        });
    
        const response = await request(app).get('/user/test');
    
        expect(response.status).toBe(404);
        expect(response.body).toBe('User does not exist');
      });
    
      test('should handle database errors', async () => {
        db.query.mockImplementation((query, values, callback) => {
          callback(new Error('Database error')); // Mock database error
        });
    
        const response = await request(app).get('/user/test');
    
        expect(response.status).toBe(500);
        expect(response.text).toBe('Error in server');
      });
    });

    describe('userUpdater function', () => {
      let app;
    
      beforeEach(() => {
        app = express();
        app.use(express.json());
        app.put('/user/:username', userUpdater);
      });
    
      afterEach(() => {
        jest.clearAllMocks(); // Clear all mocks after each test
      });
    
      test('should update an existing user', async () => {
        const mockUser = { username: 'test', email: 'test@test.com' };
    
        db.query.mockImplementation((query, values, callback) => {
          if (query.startsWith('SELECT')) {
            callback(null, [mockUser]); // Mock existing user
          } else if (query.startsWith('UPDATE')) {
            callback(null, { affectedRows: 1 }); // Mock successful update
          }
        });
    
        const response = await request(app)
          .put('/user/test')
          .send({ firstName: 'newFirstName', lastName: 'newLastName' });
    
        expect(response.status).toBe(200);
        expect(response.body).toBe('User has been updated successfully.');
      });
    
      test('should not update a non-existing user', async () => {
        db.query.mockImplementation((query, values, callback) => {
          if (query.startsWith('SELECT')) {
            callback(null, []); // Mock no existing user
          }
        });
    
        const response = await request(app)
          .put('/user/test')
          .send({ firstName: 'newFirstName', lastName: 'newLastName' });
    
        expect(response.status).toBe(404);
        expect(response.body).toBe('User does not exist');
      });
    
      test('should handle database errors', async () => {
        db.query.mockImplementation((query, values, callback) => {
          callback(new Error('Database error')); // Mock database error
        });
    
        const response = await request(app)
          .put('/user/test')
          .send({ firstName: 'newFirstName', lastName: 'newLastName' });
    
        expect(response.status).toBe(500);
        expect(response.text).toBe('Error in server');
      });
    });
    
});
