/**
 * Created by Liam Vovk on 2017-05-05.
 */

class message {
  constructor ( message ) {
    this._chat_id = message._chat_id
    this._user_from_id = message._user_from_id
    this.time_sent = Date.now()
    this.time_viewed = message.time_viewed
    this.viewed = message.viewed
    this.message = message.message
  }
}

module.exports = message