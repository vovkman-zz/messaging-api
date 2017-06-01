/**
 * Created by Liam Vovk on 2017-05-10.
 */
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const chaiHttp = require('chai-http')
chai.use(chaiAsPromised)
chai.use(chaiHttp)
let should = chai.should()

let db = require('../../db/connect/connect')
let app = require('../../app')
let userFixtures = require('../fixtures/models/users')

describe('users collection api endpoints', () => {
  before(function * () {
    yield db
  })
  describe('/POST users', () => {
    it('should insert a user', (done) => {
      let testUser = userFixtures.users[0]
      chai.request(app)
        .post('/users')
        .send(testUser)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.have.property('_id')
          res.body.should.have.property('name')
          res.body.should.have.property('email')
          res.body.should.have.property('phone_number')
          res.body.should.have.property('account_type')
          res.body.should.have.property('chats')
          done()
        })
    })
    it('should not insert a user without a name', (done) => {
      let noName = userFixtures.invalidUsers.noName
      chai.request(app)
        .post('/users')
        .send(noName)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          res.body.errors.should.have.property('name')
          done()
        })
    })
    it('should not insert a user without an account type', (done) => {
      let noName = userFixtures.invalidUsers.noAccountType
      chai.request(app)
        .post('/users')
        .send(noName)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          res.body.errors.should.have.property('account_type')
          done()
        })
    })
    it('should not insert a user with an invalid account type', (done) => {
      let noName = userFixtures.invalidUsers.invalidAccountType
      chai.request(app)
        .post('/users')
        .send(noName)
        .end((err, res) => {
          res.should.have.status(400)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          res.body.errors.should.have.property('account_type')
          done()
        })
    })
  })
  describe('/GET users/:userId', (req, res) => {
    it('should return an existing user', (done) => {
      let userId = userFixtures.userId
      chai.request(app)
        .get('/users/' + userId)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('_id')
          res.body.should.have.property('__v')
          res.body.should.have.property('name')
          res.body.should.have.property('account_type')
          done()
        })
    })
  })
})