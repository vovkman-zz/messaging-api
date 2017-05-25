/**
 * Created by Liam Vovk on 2017-05-23.
 */

let jwt = require('jsonwebtoken')
let options = null

class AuthService {
  authenticate (token) {
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev') {
      token = process.env.DEV_JWT
    }
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, options, (err, decoded) => {
        if (err) reject(err)
        else resolve(decoded)
      })
    })
  }
}

module.exports = () => { return new AuthService() }