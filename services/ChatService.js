/**
 * Created by Liam Vovk on 2017-05-07.
 */

let Chat = require('../db/models/chat')

class ChatService {
  insertChat ( newChat ) {
    newChat = new Chat( newChat )
    return newChat.save()
  }
  updateChatMessages ( insertedMessage ) {
    return Chat.findOne({'_id': insertedMessage._chat_id})
      .then( (chat) => {
        console.log(chat)
        chat.messages.push( insertedMessage._id )
        return chat.save()
      })
      .catch( (err) => {
        console.log(err)
      })
  }
}

module.exports = () => { return new ChatService() }