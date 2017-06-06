/**
 * Created by Liam Vovk on 2017-05-14.
 */

let ObjectId = require('mongodb').ObjectId
let chatId = "591a7dd29cf3f3c05d7ac1b1"

module.exports.testCollection = [
  {
    "_id" : new ObjectId(chatId),
    "active" : true,
    "last_accessed" : "2017-05-16T04:19:30.897Z",
    "messages" : [],
    "users" : [
      "5913af934c9b0944983ad3e3",
      "5913af9e4c9b0944983ad3e4"
    ]
  },
  {
    "_id" : new ObjectId("591a7e6ae06046c4a1758028"),
    "active" : true,
    "last_accessed" : "2017-05-16T04:22:02.524Z",
    "messages" : [],
    "users" : [
      "5913af934c9b0944983ad3e3",
      "5913af9e4c9b0944983ad3e4"
    ]
  }
]

module.exports.chat = { users: '["5917ffe4f91c09262137d674", "591910884ae5ba668d93e236"]' }

module.exports.invalidChat = { users: '' }

module.exports.chatId = "591a7dd29cf3f3c05d7ac1b1"

module.exports.invalidChatId = "591a7c71831cc12da"
