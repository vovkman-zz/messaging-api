/**
 * Created by Liam Vovk on 2017-05-04.
 */

require('dotenv').config()
let mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
process.env.NODE_ENV = process.env.NODE_ENV.trim()
let dbConnectionString = process.env.MONGODB_CONNECTION_PROD
if (process.env.NODE_ENV === 'test') {
  dbConnectionString = process.env.MONGODB_CONNECTION_TEST
} else if (process.env.NODE_ENV === 'dev') {
  dbConnectionString = process.env.MONGODB_CONNECTION_DEV
}
console.log(process.env.NODE_ENV)

module.exports = mongoose.connect(dbConnectionString)
