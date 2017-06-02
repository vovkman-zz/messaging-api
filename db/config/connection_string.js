/**
 * Created by Liam Vovk on 2017-05-11.
 */
require('dotenv').config()
process.env.NODE_ENV = process.env.NODE_ENV.trim()
let environment = process.env.MONGODB_CONNECTION_PROD
if (process.env.NODE_ENV === 'test') {
  environment = process.env.MONGODB_CONNECTION_TEST
} else if (process.env.NODE_ENV === 'dev') {
  environment = process.env.MONGODB_CONNECTION_DEV
}

module.exports = environment