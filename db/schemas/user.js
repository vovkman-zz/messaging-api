/**
 * Created by Liam Vovk on 2017-05-06.
 */

let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = new Schema({
  name: String,
  email: String,
  phone_number: Number,
  contractor: Boolean,
  landlord: Boolean,
  tenant: Boolean
})

module.exports = userSchema