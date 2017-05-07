/**
 * Created by Liam Vovk on 2017-05-04.
 */

let mongoose = require('mongoose')
let Schema = mongoose.Schema
let userType = require('../../types/')

let messageSchema = new Schema({
  _chat_id: Number,
  user_from: String,
  user_to: String,
  time_sent: Date,
  time_viewed: Date,
  viewed: Boolean
})

module.exports = messageSchema