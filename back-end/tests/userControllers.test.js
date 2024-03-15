import { db } from "../db.js";
import { userData, userUpdater } from '../controllers/usersController.js';

jest.mock('../db.js');
describe('userController', () => {
    
    beforeAll(() => {
        jest.useFakeTimers();
    });
    afterAll(() =>{
        db.end();
    });

    // test for userData function
    describe('userData', () => {
        it('should return user data if user exists', async  () => {

            const req = { params: { username: 'kevinzheng123' } };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };

            const mockUser = { username: 'kevinzheng123', other: 'data' };

            db.query.mockImplementation((query, params, callback) => {
                callback(null, [mockUser]);


            });

            await userData(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUser);
            
        });

        it('should return 404 if user does not exist', async () => {

            const req = { params: { username: 'noneexist' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            db.query.mockImplementation((query, params, callback) => {
                callback(null, []);
            });

            await userData(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith("User does not exist");
           
        });
    });

    //test for userUpdater function
    describe('userUpdater', () => {
        it('should update user data if user exists', () => {
            const req = {
                params: { username: 'kevinzheng123' }, body: {
                    firstName: 'Kevin',
                    lastName: 'Zheng', address1: '1234', address2: '1234',
                    city: 'San Jose', state: 'CA', zipcode: '95132'
                }
            };

            const res = { status: jest.fn(() => res), json: jest.fn() };

            db.query.mockImplementation((query, params, callback) => {
                callback(null, { affectedRows: 1 });
            });

            userUpdater(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith("User has been updated successfully");
        });
        it('should return 404 if user does not exist', () => {
            const req = {
                params: { username: 'noneexist' }, body: {
                    firstName:'Non',
                    lastName: 'Existent', address1: '1234', address2: '1234',
                    city: 'San Jose', state: 'CA', zipcode: '95132'
                }
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
            
            db.query.mockImplementation((query, params, callback) => {
                callback(null, {affectedRows: 0}); // simulation of user does not exist
            });
        
            userUpdater(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith("User does not exist");
        });

        it('should return 500 if there is a server error', () => {
            const req = {
                params: { username: 'testUser' },
                body: {
                    firstName: 'Test',
                    lastName: 'User',
                    address1: '123 Test St',
                    address2: 'Apt 4B',
                    city: 'Testville',
                    state: 'TS',
                    zipcode: '12345'
                }
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };
            db.query.mockImplementation((query, params, callback) => {
                callback(new Error('Server error'), null);
            });
    
            userUpdater(req, res);
    
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith("Error in server");
        });

    });

});




