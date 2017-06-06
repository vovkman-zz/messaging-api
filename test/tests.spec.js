/**
 * Created by Liam Vovk on 2017-06-06.
 */
/**
 * Specifies test execution order
 */
require('./db/connect.spec')
require('./api/users.spec')
require('./api/chats.spec')
require('./api/messages.spec')