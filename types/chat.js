/**
 * Created by Liam Vovk on 2017-05-08.
 */

class chat {
  constructor ( newChat ) {
    this.users = newChat.users
    this.messages = newChat.messages
    this.last_accessed = Date.now()
    this.active = newChat.active
  }
}

module.exports = chat