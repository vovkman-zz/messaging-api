/**
 * Created by Liam Vovk on 2017-05-06.
 */

class User {
  constructor (name, email, phone_number, account_type) {
    this.name = name
    this.email = email
    this.phone_number = phone_number
    this.account_type = account_type
  }
}

module.exports = User