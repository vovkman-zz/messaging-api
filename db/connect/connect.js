/**
 * Created by Liam Vovk on 2017-05-04.
 */

require('dotenv').config()
let mongoose = require('mongoose')
mongoose.Promise = require('bluebird');
let dbConnectionString = process.env.MONGODB_CONNECTION_PROD
dbConnectionString = process.env.NODE_ENV === 'test' ? process.env.MONGODB_CONNECTION_TEST : dbConnectionString
dbConnectionString = process.env.NODE_ENV === 'dev' ? process.env.MONGODB_CONNECTION_DEV : dbConnectionString
mongoose.connect( dbConnectionString )

module.exports = mongoose.connection

