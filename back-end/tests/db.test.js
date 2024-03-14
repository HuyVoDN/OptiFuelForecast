import { db } from "../db.js";
import request from 'supertest';

describe('Database Connection', () => {
    it('should connect to the database', (done) => {
        db.connect((error) => {
            if (error) {
                console.error("Error connecting to the database: " + error);
                done();
            }
            else {
                console.log("Connected to the database!");
                db.end();
                done();
            }
        });
    });
});