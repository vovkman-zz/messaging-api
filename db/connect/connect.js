/**
 * Created by Liam Vovk on 2017-05-04.
 */

require('dotenv').config({path: '/env'})
let mongoose = require('mongoose')

let dbConnectionString = process.env.NODE_ENV === 'PROD' ? process.env.MONGODB_CONNECTION_PROD : process.env.MONGODB_CONNECTION_DEV

mongoose.connect( dbConnectionString )

module.exports = mongoose.connection

