/**
 * Created by Liam Vovk on 2017-05-04.
 */

/**
 * TODO: ask devs if you can store variables locally for the lifetime of a request
 */

let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
process.env.NODE_ENV = process.env.NODE_ENV.trim()

let db = require('./db/connect/connect')

let ChatService = require('./services/ChatService')()
let MessageService = require('./services/MessageService')()
let UserService = require('./services/UserService')()

let Errors = require('./constants/errors')
let Success = require('./constants/success')

app.set('port', (process.env.port || 3000));

// app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
  // Set permissive CORS header - this allows this server to be used only as
  // an API server in conjunction with something like webpack-dev-server.
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache');
  next();
});
app.get('/', (req, res) => {
  res.send({swag: 'yolo'})
})

app.get('/users', ( req, res ) => {
  UserService.getUser()
})

app.post('/users', (req, res) => {
  let newUser = req.body
  UserService.insertUser(newUser)
    .then( (result) => {
      console.log(result)
      res.status(201).send(Success.USER_CREATED)
    })
    .catch( (err) => {
      console.log(err)
      res.status(400).send(Errors.USER_NOT_CREATED)
    })
})

app.post('/chats', (req, res) => {
  let users = JSON.parse(req.body.users)
  console.log(users)
  ChatService.insertChat( users )
    .then((newChat) => {
      console.log(newChat)
      res.status(201).send(Success.CHAT_CREATED)
    })
    .catch( (err) => {
      console.log(err)
      res.status(400).send(Errors.CHAT_NOT_CREATED)
    })
})

app.post('/messages', (req, res) => {
  let newMessage = req.body
  MessageService.insertMessage( newMessage )
    .then( ( insertedMessage ) => {
      ChatService.updateChatMessages( insertedMessage )
        .then( () => {
          res.status(201).send(Success.MESSAGE_CREATED)
        })
        .catch( (err) => {
          console.log(err)
          res.status(400).send(Errors.MESSAGE_CREATION_INCOMPLETE)
      })
    })
    .catch( (err) => {
      console.log(err)
      res.status(400).send(Errors.MESSAGE_NOT_CREATED)
    })
})

db.on('error', console.error.bind(console, 'connection error:'))

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/')
});