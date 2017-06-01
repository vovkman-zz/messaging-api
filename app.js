/**
 * Created by Liam Vovk on 2017-05-04.
 */

/**
 * TODO: ask devs if you can store variables locally for the lifetime of a request
 */

let path = require('path')
let express = require('express')
let bodyParser = require('body-parser')
let app = express()

let db = require('./db/connect/connect')

let AuthService = require('./services/AuthService')()
let ChatService = require('./services/ChatService')()
let MessageService = require('./services/MessageService')()
let UserService = require('./services/UserService')()

app.set('port', (process.env.port || 3000))

// app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Set user for lifetime of request
app.use((req, res, next) => {
  // TODO: dont pass null, get jwt from cookie
  AuthService.authenticate(null).then(decoded => {
    res.locals.user = decoded
    next()
  })
})

// Additional middleware which will set headers that we need on each request.
app.use(function (req, res, next) {
  // Set permissive CORS header - this allows this server to be used only as
  // an API server in conjunction with something like webpack-dev-server.
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

app.route('/')
  .get((req, res) => {
    res.send(res.locals.user)
  })
  .post((req, res) => {
    res.send('swag')
  })
app.route('/chats')
  .get((req, res) => {
    ChatService.getChat()
      .then(result => {
        res.status(201).send(result)
      })
      .catch((err) => {
        res.status(400).send(err)
      })
  })
  .post((req, res) => {
    let users = JSON.parse(req.body.users)
    ChatService.insertChat(users)
      .then(( newChat ) => {
        UserService.updateUserChats(newChat)
          .then(() => {
            res.status(201).send(newChat)
          })
      })
      .catch((err) => {
        res.status(400).send(err)
      })
  })
app.route('/chats/:chatId')
  .get((req, res) => {
    let chatId = req.params.chatId
    ChatService.getChat(chatId)
      .then(result => {
        res.status(200).send(result)
      })
      .catch((err) => {
        res.status(400).send(err)
      })
  })
app.route('/messages')
  .post((req, res) => {
    let newMessage = req.body
    MessageService.insertMessage(newMessage)
      .then((insertedMessage) => {
        ChatService.updateChatMessages(insertedMessage)
          .then(() => {
            res.status(201).send(insertedMessage)
          })
          .catch((err) => {
            res.status(400).send(err)
          })
      })
      .catch((err) => {
        res.status(400).send(err)
      })
  })
  .put((req, res) => {
    let messageIds = JSON.parse(req.body.messageIds)
    MessageService.updateMarkAsRead(messageIds, res.locals.user)
      .then((result) => {
        res.send(result)
      })
      .catch(err => {
        res.status(400).send(err)
      })
  })
app.route('/messages/:messageId')
  .delete((req, res) => {
    let messageId = req.params.messageId
  })
app.route('/users')
  .post((req, res) => {
    let newUser = req.body
    UserService.insertUser(newUser)
      .then((newUser) => {
        res.status(201).send(newUser)
      })
      .catch((err) => {
        res.status(400).send(err)
      })
  })
app.route('/users/:userId')
  .get((req, res) => {
    let userId = req.params.userId
    UserService.getUser(userId)
      .then((user) => {
        res.send(user)
      })
      .catch((err) => {
        res.status(400).send(err)
      })
})

db.catch((err) => {
  console.log(err)
})

app.listen(app.get('port'), function () {
  console.log('Server started: http://localhost:' + app.get('port') + '/')
})

module.exports = app // Exporting for testing purposes
