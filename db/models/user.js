/**
 * Created by Liam Vovk on 2017-05-06.
 */

let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, lowercase: true },
  phone_number: Number,
  age: Number,
  account_type: { type: String, enum: ['tenant', 'landlord', 'contractor'], required: true },
  chats: [{ type: Schema.Types.ObjectId, ref: 'Chat', default: null }]
})

module.exports = mongoose.model('User', userSchema)
