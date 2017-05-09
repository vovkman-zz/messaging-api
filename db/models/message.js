/**
 * Created by Liam Vovk on 2017-05-04.
 */

let mongoose = require('mongoose')
let Schema = mongoose.Schema

let messageSchema = new Schema({
  _chat_id: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
  _user_from_id: { type: Schema.Types.ObjectId, ref: '', required: true },
  time_sent: { type: Date, required: true },
  time_viewed: { type: Date, default: null },
  viewed: { type: Boolean, default: false },
  message: { type: String, default: '' }
})

// on first entry to the app, set viewed flag, view flag makes you skip checking middleware

module.exports = mongoose.model('Message', messageSchema)