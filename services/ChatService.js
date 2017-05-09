/**
 * Created by Liam Vovk on 2017-05-07.
 */

let Chat = require('../db/models/chat')

class ChatService {
  insertChat ( newChat ) {
    newChat = new Chat( newChat )
    return newChat.save()
  }
}

module.exports = () => { return new ChatService() }