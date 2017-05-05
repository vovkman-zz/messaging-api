/**
 * Created by Liam Vovk on 2017-05-04.
 */

var mongoose = require('mongoose')
var Schema = mongoose.Schema

let messageSchema = new Schema({
  _chat_id: Number,
  user_from: String,
  user_to: String,
  time_sent: Date,
  time_viewed: Date,
  viewed: Boolean
})

modulel.exports = mongoose.model('Messages', messageSchema)