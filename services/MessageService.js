/**
 * Created by Liam Vovk on 2017-05-05.
 */

let Message = require('../db/models/message')

class MessageService {
  insertMessage( newMessage ) {
    newMessage = new Message( newMessage )
    return newMessage.save()
  }
}

module.exports = () => { return new MessageService() }

