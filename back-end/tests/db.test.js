import { db } from "../db.js";
import request from 'supertest';

describe('Database Connection',  () => {

     afterAll(() => {
         db.end();
    });

     it('should connect to the database', (done) => {
         db.connect((error) => {
            if (error) {
                console.error("Error connecting to the database: " + error);
                done(error);
            }
            else {
                console.log("Connected to the database!");
                done();
            }
        });
    });
});