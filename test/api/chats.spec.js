/**
 * Created by Liam Vovk on 2017-05-10.
 */
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const chaiHttp = require('chai-http')
chai.use(chaiAsPromised)
chai.use(chaiHttp)
let should = chai.should()

let connectionString = require('../../db/config/connection_string')
let mongo = require('mongodb').MongoClient
let db = mongo.connect(connectionString)
let collection
let app = require('../../app')
let chatFixtures = require('../fixtures/models/chats')

describe('chats collection api endpoints', () => {
  before(function * () {
    db = yield db
    yield db.collection('chats').insertMany(chatFixtures.testCollection)
  })
  after(function * () {
    yield db.collection('chats').drop()
  })
  describe('/POST chats', () => {
    it('should insert a chat', (done) => {
      let testChat = chatFixtures.chat
      chai.request(app)
        .post('/chats')
        .send(testChat)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.have.property('_id')
          res.body.should.have.property('users')
          res.body.should.have.property('messages')
          res.body.should.have.property('active')
          chatFixtures.chatId = res.body._id
          done()
        })
    })
  })
  describe('/GET chats', () => {
    it('should get a chat', (done) => {
      let chatId = chatFixtures.chatId
      chai.request(app)
        .get('/chats/' + chatId)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('_id')
          res.body.should.have.property('active')
          res.body.should.have.property('last_accessed')
          res.body.should.have.property('messages')
          res.body.should.have.property('users')
          done()
        })
    })
    it('should not get a chat with an invalid chatId', (done) => {
      let invalidChatId = chatFixtures.invalidChatId
      chai.request(app)
        .get('/chats/' + invalidChatId)
        .send(invalidChatId)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.have.property('message')
          res.body.should.have.property('name')
          res.body.should.have.property('stringValue')
          res.body.should.have.property('kind')
          res.body.should.have.property('value')
          res.body.should.have.property('path')
          done()
        })
    })
  })
})