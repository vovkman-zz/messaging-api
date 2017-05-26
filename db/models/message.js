/**
 * Created by Liam Vovk on 2017-05-04.
 */

let mongoose = require('mongoose')
let Schema = mongoose.Schema

let viewedBy = new Schema({
  _user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  viewed_at: { type: Date, default: null }
}, {_id: false})

let messageSchema = new Schema({
  _chat_id: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
  _user_from_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  time_sent: { type: Date, default: Date.now() },
  viewed_by: [viewedBy],
  message: { type: String, default: '' }
})

module.exports = mongoose.model('Message', messageSchema)
