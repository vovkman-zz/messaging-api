/**
 * Created by Liam Vovk on 2017-05-07.
 */

let User = require('../db/models/user')

class UserService {
  insertUser ( newUser ) {
    newUser = new User( newUser )
    return newUser.save()
  }
  getUser(  ) {

  }
}

module.exports = () => { return new UserService() }