/**
 * Created by Liam Vovk on 2017-05-06.
 */

let mongoose = require('mongoose')
let Schema = mongoose.Schema

let chatSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message', default: [] }],
  last_accessed: { type: Date, default: Date.now() },
  active: { type: Boolean, default: true }
})

module.exports = mongoose.model('Chat', chatSchema)