const mongoose = require('mongoose')
const connectDB = require('./config/db')
const config = require('config')
const db = config.get('mongoTestURI')

module.exports = {
    setupDB (databaseName) {
      beforeAll(async () => {
        // Connect Database
        connectDB(db)
    });
  
    afterAll(async () => {
        mongoose.connection.close()
    });
    }
  }
