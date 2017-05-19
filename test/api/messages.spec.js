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
          res.should.have.status(201)
          res.should.have.property('_id')
          res.should.have.property('__v')
          res.should.have.property('')
          res.should.have.property('viewed')
          res.should.have.property('time_viewed')
          res.should.have.property('time_sent')
          done()
        })
    })
  })
})