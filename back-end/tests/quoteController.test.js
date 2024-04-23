const request = require('supertest');
const express = require('express');
const { getFuelQuotes, calculateFuelQuote, createFuelQuote } = require('../controllers/quoteController');
const { db } = require('../db');
const PricingModule = require('../pricingModule');
jest.mock('../db');
jest.mock('../pricingModule');
const app = express();
app.get('/quotes/:username', getFuelQuotes);
app.use(express.json());
app.post('/calculate-quote/:username', calculateFuelQuote);
app.post('/create-quote/:username', createFuelQuote);


describe('getFuelQuotes function', () => {
  beforeAll(() => {
    consoleError = console.error;
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = consoleError;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return fuel quotes for an existing user', async () => {
    const mockResult = [{ quote: 'quote1' }, { quote: 'quote2' }];
    db.query.mockImplementation((query, params, callback) => {
      callback(null, mockResult);
    });

    const response = await request(app).get('/quotes/testuser');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ result: mockResult });
  });

  test('should not return fuel quotes for a non-existing user', async () => {
    db.query.mockImplementation((query, params, callback) => {
      callback(null, []);
    });

    const response = await request(app).get('/quotes/nonexistentuser');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ result: [] });
  });

  test('should handle database errors', async () => {
    db.query.mockImplementation((query, params, callback) => {
      callback(new Error('Database error'), null);
    });

    const response = await request(app).get('/quotes/testuser');
    expect(response.statusCode).toBe(500);
    expect(response.text).toBe('Error in server');
  });
});

describe('calculateFuelQuote function', () => {
  let consoleError;

  beforeAll(() => {
    consoleError = console.error;
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = consoleError;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should calculate a fuel quote', async () => {
    const mockResult = [{ count: 1 }];
    db.query.mockImplementation((query, params, callback) => {
      callback(null, mockResult);
    });

    const mockPrice = 2.5;
    PricingModule.mockImplementation(() => {
      return {
        calculatePrice: () => mockPrice,
      };
    });

    const response = await request(app).post('/calculate-quote/testuser').send({
      address: '123 Test St',
      city: 'Test City',
      state: 'TX',
      zipcode: '12345',
      date: '2022-01-01',
      gallonsRequested: '1000',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(mockPrice);
  });

  test('should handle database errors', async () => {
    db.query.mockImplementation((query, params, callback) => {
      callback(new Error('Database error'), null);
    });

    const response = await request(app).post('/calculate-quote/testuser').send({
      address: '123 Test St',
      city: 'Test City',
      state: 'TX',
      zipcode: '12345',
      date: '2022-01-01',
      gallonsRequested: '1000',
    });

    expect(response.statusCode).toBe(500);
    expect(response.text).toBe('Error in server');
  });
});
describe('createFuelQuote function', () => {
  let consoleError;

  beforeAll(() => {
    consoleError = console.error;
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = consoleError;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create a fuel quote', async () => {
    const mockResult = [{ id_user: 1 }];
    db.query.mockImplementation((query, params, callback) => {
      callback(null, mockResult);
    });

    const response = await request(app).post('/create-quote/testuser').send({
      address: '123 Test St',
      city: 'Test City',
      state: 'TX',
      zipcode: '12345',
      date: '2022-01-01',
      gallonsRequested: '1000',
      suggestedPrice: '2.5',
      totalAmountDue: '2500',
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual('Fuel Quote has been created successfully');
  });

  test('should handle database errors', async () => {
    db.query.mockImplementation((query, params, callback) => {
      callback(new Error('Database error'), null);
    });

    const response = await request(app).post('/create-quote/testuser').send({
      address: '123 Test St',
      city: 'Test City',
      state: 'TX',
      zipcode: '12345',
      date: '2022-01-01',
      gallonsRequested: '1000',
      suggestedPrice: '2.5',
      totalAmountDue: '2500',
    });

    expect(response.statusCode).toBe(500);
    expect(response.text).toBe('Error in server');
  });
});