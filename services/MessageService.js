/**
 * Created by Liam Vovk on 2017-05-05.
 */

let Message = require('../db/models/message')

class MessageService {
  insertMessage (newMessage) {
    newMessage = new Message(newMessage)
    return newMessage.save()
  }
  updateMarkAsRead(messageId, user) {
    return Message.findById(messageId)
      .then((err, message) => {
        if (err) return err
        let viewedByUser = {}
        viewedByUser._user_id = user.sub
        viewedByUser.viewed_at = Date.now()
        message.viewedBy.push(viewedByUser)
        return message.save()
      })
  }
}

// make a plugin that updates the chats collection with the ObjectId of the message

module.exports = () => { return new MessageService() }
