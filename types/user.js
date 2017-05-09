/**
 * Created by Liam Vovk on 2017-05-06.
 */

class user {
  constructor ( user ) {
    this.name = user.name
    this.email = user.email
    this.phone_number = user.phone_number
    this.account_type = user.account_type
    this.chats = user.chats
  }
}

module.exports = user