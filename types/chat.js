/**
 * Created by Liam Vovk on 2017-05-08.
 */

class Chat {
  constructor ( users, messages = null, last_accessed = null, active = null) {
    this.users = users
    this.messages = messages
    this.last_accessed = last_accessed
    this.active = active
  }
}

module.exports = Chat