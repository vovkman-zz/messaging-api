/**
 * Created by Liam Vovk on 2017-05-14.
 */

let ObjectId = require('mongodb').ObjectId
let userId = "590f5c20d96cd4eccb38d6fc"

let testCollection = [
  {
    _id: new ObjectId("5931a8bbcdb67137371faa21"),
    name: 'Liam TestDB',
    chats: []
  },
  {
    _id: new ObjectId("591910884ae5ba668d93e236"),
    name: 'Liam TestDB',
    chats: []
  },
  {
    _id: new ObjectId("591a714c4128cbaca1ab49a6"),
    name: 'Liam TestDB',
    chats: []
  }
]

module.exports.userId = userId
module.exports.testCollection = testCollection

module.exports.user = { name: 'Liam TestDB' }

module.exports.invalidUsers =
  {
    noName: {
    }
  }