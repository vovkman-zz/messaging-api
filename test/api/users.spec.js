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

describe('users collection api endpoints', () => {
  describe('/POST users', () => {
    it('should insert a user', function * () {
      let testUser = modelFixtures.users[0]
      chai.request(app)
        .post('/users')
        .send(testUser)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.have.property('_id')
          res.body.should.have.property('__v')
          res.body.should.have.property('name')
          res.body.should.have.property('email')
          res.body.should.have.property('phone_number')
          res.body.should.have.property('account_type')
          res.body.should.have.property('chats')
        })
    })
    it('should not insert a user without a name', function * () {
      let invalidUser = modelFixtures.
    })
  })
})