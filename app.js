/**
 * Created by Liam Vovk on 2017-05-04.
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

let Chat = require('./types/chat')
let Message = require('./types/message')
let User = require('./types/user')

let Errors = require('./constants/errors')

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
  newUser = new User( newUser )
  UserService.insertUser(newUser)
    .then( (result) => {
      console.log(result)
    })
    .catch( (err) => {
      console.log(err)
    })
  res.send('swag')
})

app.post('/chats', (req, res) => {
  let users = JSON.parse(req.body.users)
  let newChat = new Chat( users )
  ChatService.insertChat( newChat )
    .then((result) => {
      console.log(result)
    })
    .catch( (err) => {
      console.log(err)
    })
  res.send('swag')
})

app.post('/messages', (req, res) => {
  let newMessage = req.body
  MessageService.insertMessage( newMessage )
    .then( (result) => {
      console.log(result)
      res.send('booya')
    })
    .catch( (err) => {
      console.log(err)
      res.send('error yahbish')
    })
})

db.on('error', console.error.bind(console, 'connection error:'))

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/')
});