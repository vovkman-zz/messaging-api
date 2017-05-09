/**
 * Created by Liam Vovk on 2017-05-04.
 */

let mongoose = require('mongoose')
let Schema = mongoose.Schema

let messageSchema = new Schema({
  _chat_id: { type: Schema.Types.ObjectId, ref: 'Chats' },
  user_from: { type: String, required: true },
  user_to: { type: String, required: true },
  time_sent: Date,
  time_viewed: Date,
  viewed: Boolean
})

module.exports = mongoose.model('Message', messageSchema)