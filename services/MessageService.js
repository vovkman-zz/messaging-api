/**
 * Created by Liam Vovk on 2017-05-05.
 */

let Message = require('../db/models/message')

class MessageService {
  insertMessage (newMessage) {
    newMessage = new Message(newMessage)
    return newMessage.save()
  }
  getMessage (messageId, user) {
    return Message.findOne({'_id': messageId})
      .then(message => {
        let viewed = message.viewed_by.filter(viewer => {
          return viewer._user_id == user.sub
        })
        if (viewed.length === 0) {
          let messageId = [message._id]
          return this.updateMarkAsRead(messageId, user)
            .then(updatedMessage => {
              return updatedMessage.updatedMessages[0]
            })
            .catch(err => {
              return err
            })
        }
        return message
      })
      .catch(err => {
        return Promise.reject(err)
      })
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
        return err
      })
  }
}

// make a plugin that updates the chats collection with the ObjectId of the message

module.exports = () => { return new MessageService() }
