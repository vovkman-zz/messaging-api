/**
 * Created by Liam Vovk on 2017-05-07.
 */

let Chat = require('../db/models/chat')

class ChatService {
  insertChat (users) {
    let newChat = new Chat()
    newChat.users = users
    return newChat.save()
  }
  updateChatMessages (insertedMessage) {
    return Chat.findOne({'_id': insertedMessage._chat_id})
      .then((chat) => {
        chat.messages.push(insertedMessage._id)
        return chat.save()
      })
      .catch((err) => {
        return err
      })
  }
  getChat(chatId){
    return Chat
      .findOne({'_id': chatId})
      .populate('users')
      .exec()
  }
}

module.exports = () => { return new ChatService() }
