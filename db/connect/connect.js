/**
 * Created by Liam Vovk on 2017-05-04.
 */

let mongoose = require('mongoose')
let connectionString = require('../config/connection_string')
mongoose.Promise = require('bluebird')

module.exports = mongoose.connect(connectionString)
