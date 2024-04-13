const request = require('supertest');
const { getFuelQuotes } = require('../controllers/quoteController.js');
const { db, closeConnection } = require('../db.js');
const express = require('express');

jest.mock('../db.js'); // Mock the db module

describe('getFuelQuotes function', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.get('/quotes/:username', getFuelQuotes);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  test('should return fuel quotes for an existing user', async () => {
    const mockQuotes = [{ id_quote: 1, price: 2.5 }, { id_quote: 2, price: 2.7 }];

    db.query.mockImplementation((query, values, callback) => {
      if (query.startsWith('SELECT')) {
        callback(null, mockQuotes); // Mock existing quotes
      }
    });

    const response = await request(app).get('/quotes/test');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: mockQuotes });
  });

  test('should not return fuel quotes for a non-existing user', async () => {
    db.query.mockImplementation((query, values, callback) => {
      if (query.startsWith('SELECT')) {
        callback(null, []); // Mock no existing quotes
      }
    });

    const response = await request(app).get('/quotes/test');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: [] });
  });

  test('should handle database errors', async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(new Error('Database error')); // Mock database error
    });

    const response = await request(app).get('/quotes/test');

    expect(response.status).toBe(500);
    expect(response.text).toBe('Error in server');
  });

});