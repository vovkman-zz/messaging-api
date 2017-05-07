/**
 * Created by Liam Vovk on 2017-05-05.
 */

class Message {
  constructor ( _chat_id, user_from, user_to, time_sent, time_viewed, viewed ) {
    this._chat_id = _chat_id
    this.user_from = user_from
    this.user_to = user_to
    this.time_sent = time_sent
    this.time_vivewed = time_viewed
    this.viewed = viewed
  }
}

module.exports = Message