const { db, closeConnection } = require("../db.js");


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