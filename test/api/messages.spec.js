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
let messageFixtures = require('../fixtures/models/messages')

describe('messages collection api endpoints', () => {
  before(function * () {
    yield db
  })
  describe('/POST messages', () => {
    it('should insert a message', (done) => {
      let testMessage = messageFixtures.message
      chai.request(app)
        .post('/messages')
        .send(testMessage)
        .end((err, res) => {
          if (!err) {
            res.should.have.status(201)
            res.body.should.have.property('_id')
            res.body.should.have.property('__v')
            res.body.should.have.property('_user_from_id')
            res.body.should.have.property('_chat_id')
            res.body.should.have.property('viewed_by')
            res.body.should.have.property('time_sent')
            done()
          }
        })
    })
    it('should not insert a message without _chat_id parameter', (done) => {

    })
    it('should update a messages views')
  })
})