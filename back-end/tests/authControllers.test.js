import { db } from "../db.js";
import { register, login} from "../controllers/authController.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


jest.mock('../db.js');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

// test for register functionality
describe('register', () => {

    beforeAll(() => {
        jest.useFakeTimers();
    });
    afterAll(() =>{
        db.end();
    });
    beforeEach(() => {
        jest.clearAllMocks();
        console.log = jest.fn();
    });
    
    it('should return 409 if user already exists', async () => {
        const req = {
            body: {
                email: 'kevin@gmail.com',
                username: 'kevinzheng123',
                password: '123'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        db.query.mockImplementation((query, values, callback) => {
            callback(null, [{}]); // simulate if user already existed
        });
        await register(req, res);
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith('User already exists');
    });

    it('should return 500 if server error', async () => {
        const req = {
            body: {
                email: 'kevin@gmail.com',
                username: 'kevinzheng123',
                password: '123'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        db.query.mockImplementation((query, values, callback) => {
            callback(new Error('Server error')); // simulate if error in server
        });
        await register(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith('Error in server');
    });

    it('should register a user', async () => {
        const req = {
            body:
            {
                email: 'test@test.com',
                username: 'testuser',
                password: '123'
            }
        }; // fill in with email, username, password
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };

        db.query.mockImplementation((query, values, callback) => {
            callback(null, []); // simulate if user does not exist yet
        });

        bcrypt.genSaltSync.mockReturnValue('salt');
        bcrypt.hashSync.mockReturnValue('hash');

        db.query.mockImplementation((query, values, callback) => {
            callback(null, { affectedRows: 1 }); // query to register user in, simulating
        });

        await register(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(`User has been registered successfully.`);
    });
   
});

//unit test for login functionality
describe('login', () => {

    beforeAll(() => {
        jest.useFakeTimers();
    });
    afterAll(() =>{
        db.end();
    });
    beforeEach(() => {
        jest.clearAllMocks();
        console.log = jest.fn();
    });
    
    it('should return 500 if db query fails', () => {
        db.query.mockImplementation((query, params, callback) => {
            callback(new Error('DB error'));
        });

        const req = {
            body: {
                email: 'test@test.com',
                password: 'password'
            }
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        login(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith('Error in server');
    });

    it('should return 404 if user does not exist', () => {
        db.query.mockImplementation((query, params, callback) => {
            callback(null, []);
        });

        const req = {
            body: {
                email: 'test@test.com',
                password: 'password'
            }
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        login(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith('User does not exist');
    });

    it('should return 401 if password is invalid', () => {
        const user = {
            email: 'test@test.com',
            password: bcrypt.hashSync('password', 10)
        };

        db.query.mockImplementation((query, params, callback) => {
            callback(null, [user]);
        });

        const req = {
            body: {
                email: 'test@test.com',
                password: 'wrongpassword'
            }
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        login(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith('Invalid password');
    });

    // cant figure out how to test this
    // it('should generate a token and send it in a cookie when password matches', async () => {
    //     const user = {
    //         email: 'kevin@gmail.com',
    //         password:"$2b$10$Awa1M79hUjc5YflHZF4nn..Xl5AnyvAsfIj7WbEiyV0Sp/1nmqrcy", // hashed password
    //         username: 'kevinzheng123',
    //         firstname: 'kevin',
    //         lastname: 'zheng'
    //     };

    //     db.query.mockImplementation((query, params, callback) => {
    //         callback(null, [user]);
    //     });

    //     const req = {
    //         body: {
    //             email: 'kevin@gmail.com',
    //             password: '123'
    //         }
    //     };
    //     const res = {
    //         status: jest.fn(() => res),
    //         json: jest.fn(),
    //         cookie: jest.fn()
    //     };

    //     await login(req, res);
        
    //     expect(res.status).toHaveBeenCalledWith(401);
    //     expect(res.cookie).toHaveBeenCalled();
    //     const cookieArgs = res.cookie.mock.calls[0];
    //     expect(cookieArgs[0]).toBe('token');
    //     expect(typeof cookieArgs[1]).toBe('string'); // The token should be a string
    //     expect(cookieArgs[2]).toEqual({
    //         httpOnly: true,
    //         sameSite: 'strict'
    //     });

    //     // Check that the token is valid
    //     const token = cookieArgs[1];
    //     const decoded = jwt.verify(token, 'secret');
    //     expect(decoded.email).toBe(user.email);
    //     expect(decoded.username).toBe(user.username);

    //     // Check the response
    //     const jsonArgs = res.json.mock.calls[0][0];
    //     expect(jsonArgs.message).toBe('User has been logged in successfully');
    //     expect(jsonArgs.username).toBe(user.username);
    //     expect(jsonArgs.token).toBe(token);
    //     expect(jsonArgs.firstname).toBe(user.firstname);
    //     expect(jsonArgs.lastname).toBe(user.lastname);
        

    // });
});