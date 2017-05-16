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

let ChatService = require('./services/ChatService')()
let MessageService = require('./services/MessageService')()
let UserService = require('./services/UserService')()

app.set('port', (process.env.port || 3000))

// app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Additional middleware which will set headers that we need on each request.
app.use(function (req, res, next) {
  // Set permissive CORS header - this allows this server to be used only as
  // an API server in conjunction with something like webpack-dev-server.
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache')
  next()
})
app.get('/', (req, res) => {
  res.send({swag: 'yolo'})
})

app.get('/users/:userId', (req, res) => {
  let userId = req.params.userId
  UserService.getUser(userId)
    .then((user) => {
      res.send(user)
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send(err)
    })
})

app.get('/chats', (req, res) => {
  ChatService.getChat().then(result => {
    console.log(result)
    res.status(201).send(result)
  })
})

app.post('/users', (req, res) => {
  let newUser = req.body
  UserService.insertUser(newUser)
    .then((newUser) => {
      res.status(201).send(newUser)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
})

app.post('/chats', (req, res) => {
  let users = JSON.parse(req.body.users)
  ChatService.insertChat(users)
    .then(( newChat ) => {
    UserService.updateUserChats(newChat)
      .then(() => {
        res.status(201).send(newChat)
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send(err)
    })
})

app.post('/messages', (req, res) => {
  let newMessage = req.body
  MessageService.insertMessage(newMessage)
    .then((insertedMessage) => {
      ChatService.updateChatMessages(insertedMessage)
        .then((newMessage) => {
          res.status(201).send(newMessage)
        })
        .catch((err) => {
          console.log(err)
          res.status(400).send(err)
        })
    })
    .catch((err) => {
      console.log(err)
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
