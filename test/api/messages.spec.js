/**
 * Created by Liam Vovk on 2017-05-10.
 */
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const chaiHttp = require('chai-http')
chai.use(chaiAsPromised)
chai.use(chaiHttp)
const expect = chai.expect
let should = chai.should()

let connectionString = require('../../db/config/connection_string')
let mongo = require('mongodb').MongoClient
let db = mongo.connect(connectionString)
let collection
let app = require('../../app')
let messageFixtures = require('../fixtures/models/messages')

describe('messages collection api endpoints', () => {
  before(function * () {
    db = yield db
    yield db.collection('messages').insertMany(messageFixtures.testCollection)
  })
  after(function * () {
    yield db.collection('messages').drop()
  })
  describe('/POST messages', () => {
    it('should insert a message', done => {
      let testMessage = messageFixtures.message
      chai.request(app)
        .post('/messages')
        .send(testMessage)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.have.property('_id')
          res.body.should.have.property('_user_from_id')
          res.body.should.have.property('_chat_id')
          res.body.should.have.property('viewed_by')
          res.body.should.have.property('time_sent')
          messageFixtures.messageId = res.body._id
          done()
        })
    })
    it('should not insert a message without _chat_id parameter', done => {
      let testMessage = messageFixtures.invalidMessages.noChatId
      chai.request(app)
        .post('/messages')
        .send(testMessage)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.have.property('errors')
          done()
        })
    })
    it('should not insert a message without _user_from_id parameter', done => {
      let testMessage = messageFixtures.invalidMessages.noUserFromId
      chai.request(app)
        .post('/messages')
        .send(testMessage)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.have.property('errors')
          done()
        })
    })
  })
  describe('/PUT messages', () => {
    it('should update a messages views', done => {
      let testMessage = messageFixtures.updateMessageViews
      chai.request(app)
        .put('/messages')
        .send(testMessage)
        .end((err, res) => {
          expect(res.body.updatedMessages).to.have.lengthOf(JSON.parse(testMessage.messageIds).length)
          res.body.should.have.property('updatedMessages')
          res.body.should.have.property('updatedCount')
          done()
        })
    })
    // it('should update multiple messages views', done => {
    //   let testMessage = messageFixtures.updateMessagesViews
    //   chai.request(app)
    //     .put('/messages')
    //     .send(testMessage)
    //     .end((err, res) => {
    //       expect(res.body.updatedMessages).to.have.lengthOf(JSON.parse(testMessage.messageIds).length)
    //       res.body.should.have.property('updatedMessages')
    //       res.body.should.have.property('updatedCount')
    //       done()
    //     })
    // })
  })
  describe('/GET messages/:messageId', () => {
    it('should get a message', done => {
      let messageId = messageFixtures.messageId
      chai.request(app)
        .get('/messages/' + messageId)
        .send()
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('_id')
          res.body.should.have.property('_chat_id')
          res.body.should.have.property('_user_from_id')
          res.body.should.have.property('message')
          res.body.should.have.property('viewed_by')
          res.body.should.have.property('time_sent')
          done()
        })
    })
    it('should not get a message with an invalid id', done => {
      let messageId = messageFixtures.invalidMessageId
      chai.request(app)
        .get('/messages/' + messageId)
        .send()
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