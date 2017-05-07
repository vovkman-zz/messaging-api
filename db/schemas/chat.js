/**
 * Created by Liam Vovk on 2017-05-06.
 */

let mongoose = require('mongoose')
let Schema = mongoose.Schema
let messageSchema = require('../schemas/message')
let userSchema = require('../schemas/user')

let chatSchema = new Schema({
  users: [userSchema],
  messages: [messageSchema],
  active: Boolean
})

module.exports = chatSchema