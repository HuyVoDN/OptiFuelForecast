import { db } from "../db.js";
import { register} from "../controllers/authController.js";
import bcrypt from "bcrypt";
//import jwt from "jsonwebtoken";


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
