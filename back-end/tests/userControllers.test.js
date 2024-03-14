import request from 'supertest';
import { app } from '../index.js';
import { db } from "../db.js";
import { userData, userUpdater } from '../controllers/usersController.js';

jest.mock('../db.js');

describe('userController', () => {

    // test for userData function
    describe('userData', () => {
        it('should return user data if user exists', () => {

            const req = { params: { username: 'kevinzheng123' } };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn()
            };

            const mockUser = { username: 'kevinzheng123', other: 'data' };

            db.query.mockImplementation((query, params, callback) => {
                callback(null, [mockUser]);


            });

            userData(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUser);

        });

        it('should return 404 if user does not exist', () => {

            const req = { params: { username: 'noneexist' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            db.query.mockImplementation((query, params, callback) => {
                callback(null, []);
            });

            userData(req, res);

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
            
        
        });
    });

});




