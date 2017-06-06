/**
 * Created by Liam Vovk on 2017-05-14.
 */

let userId = require('./users').userId
let chatId = require('./chats').chatId
let ObjectId = require('mongodb').ObjectId
let messageId = "592f92c06fcb396fabdebe89"
let testCollection = [
  {
    "_id" : new ObjectId(messageId),
    "_chat_id" : chatId,
    "_user_from_id" : userId,
    "message" : "The one message to rule them all.",
    "viewed_by" : [],
    "time_sent" : "2017-06-01T04:06:23.866Z"
  },
  {
    "_id" : new ObjectId("592f9a4b4bf96c5f53c3f830"),
    "_chat_id" : chatId,
    "_user_from_id" : userId,
    "message" : "The one message to rule them all.",
    "viewed_by" : [],
    "time_sent" : "2017-06-01T04:38:35.121Z"
  },
  {
    "_id" : new ObjectId("592f9b0f74e5786cfbaf686b"),
    "_chat_id" : chatId,
    "_user_from_id" : userId,
    "message" : "The one message to rule them all.",
    "viewed_by" : [],
    "time_sent" : "2017-06-01T04:41:51.843Z"
  }
]

module.exports.testCollection = testCollection

module.exports.message = {
    _chat_id: chatId,
    _user_from_id: userId,
    message: 'The one message to rule them all.'
}

module.exports.messageId = messageId
module.exports.invalidMessageId = "5924e5195d821f1e05"

module.exports.updateMessageViews = { messageIds: JSON.stringify([testCollection[0]._id]) }

module.exports.updateMessagesViews = {
  messageIds: JSON.stringify([testCollection[0]._id, testCollection[1]._id, testCollection[2]._id])
}

module.exports.invalidMessages = {
  noChatId: {
    _user_from_id: '590f5c20d96cd4eccb38d6fc',
    _user_to_id: '590f5c90f3ba9c0d5cda6bad',
    message: 'The one message to rule them all.'
  },
  noUserFromId: {
    _chat_id: '5911261c07a02e3d3c59e639',
    _user_to_id: '590f5c90f3ba9c0d5cda6bad',
    message: 'The one message to rule them all.'
  },
  noUserToId: {
    _chat_id: '5911261c07a02e3d3c59e639',
    _user_from_id: '590f5c20d96cd4eccb38d6fc',
    message: 'The one message to rule them all.'
  }
}