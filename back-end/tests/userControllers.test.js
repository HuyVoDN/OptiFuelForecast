import { db } from "../db.js";
import { userData, userUpdater } from '../controllers/usersController.js';

jest.mock('../db.js');
describe('userController', () => {
    
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterAll(() =>{
        db.end();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    // test for userData function

describe('userData', () => {
  it('should return user data', async () => {
    const mockUser = {
      username: 'testuser',
      email: 'test@gmail.com',
      firstname: 'Test',
      lastname: 'User',
    };

    const req = {
      params: {
        username: 'testuser',
      },
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    db.query.mockImplementation((query, values, callback) => {
      if (query.includes('SELECT * FROM OptiFuelForecast.Users WHERE username = ?')) {
        callback(null, [mockUser]);
      }
    });

    await userData(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it('should return 404 if user does not exist', async () => {
    const req = {
      params: {
        username: 'testuser',
      },
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    db.query.mockImplementation((query, values, callback) => {
      if (query.includes('SELECT * FROM OptiFuelForecast.Users WHERE username = ?')) {
        callback(null, []);
      }
    });

    await userData(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith('User does not exist');
  });

  it('should return 500 if there is a server error', async () => {
    const req = {
      params: {
        username: 'testuser',
      },
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
      send: jest.fn(),
    };

    db.query.mockImplementation((query, values, callback) => {
      if (query.includes('SELECT * FROM OptiFuelForecast.Users WHERE username = ?')) {
        callback(new Error('Server error'));
      }
    });

    await userData(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Error in server');
  });
});
describe('userUpdater', () => {
    it('should update user data', async () => {
      const mockUser = {
        username: 'testuser',
        firstname: 'Test',
        lastname: 'User',
        address1: '123 Test St',
        address2: '',
        city: 'Test City',
        state: 'TS',
        zipcode: '12345',
      };
  
      const req = {
        params: {
          username: 'testuser',
        },
        body: mockUser,
      };
  
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
  
      db.query.mockImplementation((query, values, callback) => {
        if (query.includes('SELECT * FROM OptiFuelForecast.Users WHERE username = ?')) {
          callback(null, [mockUser]);
        } else if (query.includes('UPDATE OptiFuelForecast.Users SET')) {
          callback(null, { affectedRows: 1 });
        }
      });
  
      await userUpdater(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith('User has been updated successfully.');
    });
  
    it('should return 404 if user does not exist', async () => {
      const req = {
        params: {
          username: 'testuser',
        },
        body: {},
      };
  
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
  
      db.query.mockImplementation((query, values, callback) => {
        if (query.includes('SELECT * FROM OptiFuelForecast.Users WHERE username = ?')) {
          callback(null, []);
        }
      });
  
      await userUpdater(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith('User does not exist');
    });
  
    it('should return 500 if there is a server error', async () => {
      const req = {
        params: {
          username: 'testuser',
        },
        body: {},
      };
  
      const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
      };
  
      db.query.mockImplementation((query, values, callback) => {
        if (query.includes('SELECT * FROM OptiFuelForecast.Users WHERE username = ?')) {
          callback(new Error('Server error'));
        }
      });
  
      await userUpdater(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Error in server');
    });
  });
});




