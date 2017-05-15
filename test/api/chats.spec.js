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

let db = require('../../db/connect/connect')
let app = require('../../app')
let modelFixtures = require('../fixtures/models/models')

describe('chats collection api endpoints', () => {
  before(function * () {
    yield db
  })
  describe('/POST chats', () => {
    it('should insert a chat', function * () {
      let testChat = modelFixtures.chats[0]
      chai.request(app)
        .post('/chats')
        .send(testChat)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.have.property('_id')
          res.body.should.have.property('__v')
          res.body.should.have.property('active')
          res.body.should.have.property('last_accessed')
          res.body.should.have.property('messages')
          res.body.should.have.property('users')
          expect(res.body.users).to.eql(testChat.users)
        })
    })
    it('should not create a chat without 2 or more users', function * () {

    })
  })
})