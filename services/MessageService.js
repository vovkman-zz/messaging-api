/**
 * Created by Liam Vovk on 2017-05-05.
 */

let Message = require('../db/models/message')

class MessageService {
  insertMessage (newMessage) {
    newMessage = new Message(newMessage)
    return newMessage.save()
  }
  updateMarkAsRead(messageIds, user) {
    let updatedMessages = messageIds.map(messageId => {
      return Message.findById(messageId)
        .then(message => {
          if (message != null) {
            let viewedByUser = {}
            viewedByUser._user_id = user.sub
            viewedByUser.viewed_at = Date.now()
            message.viewed_by.push(viewedByUser)
            return message.save()
          }
          else return Promise.resolve([])
        })
        .catch(err => {
          return Promise.reject(err)
        })
    })
    return Promise.all(updatedMessages)
      .then(updatedMessages => {
        let response = {
          updatedMessages: updatedMessages,
          updatedCount: updatedMessages.length
        }
        return response
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }
}

// make a plugin that updates the chats collection with the ObjectId of the message

module.exports = () => { return new MessageService() }
