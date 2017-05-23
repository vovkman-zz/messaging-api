/**
 * Created by Liam Vovk on 2017-05-05.
 */

let Message = require('../db/models/message')

class MessageService {
  insertMessage (newMessage) {
    newMessage = new Message(newMessage)
    return newMessage.save()
  }
  updateMarkAsRead() {

  }
}

// make a plugin that updates the chats collection with the ObjectId of the message

module.exports = () => { return new MessageService() }
