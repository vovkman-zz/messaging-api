/**
 * Created by Liam Vovk on 2017-05-07.
 */

let User = require('../db/models/user')

class UserService {
  insertUser (newUser) {
    newUser = new User(newUser)
    return newUser.save()
  }
  getUser (user) {
    return User.findById(user.sub)
  }
  updateUserChats (newChat) {
    let preUpdateUsers =
      newChat.users.map((user) => {
        return User.findByIdAndUpdate(user,
          {"$push": {"chats": newChat._id}})
      })
    return Promise.all(preUpdateUsers)
  }
}

module.exports = () => { return new UserService() }
