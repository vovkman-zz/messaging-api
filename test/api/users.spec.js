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
let userFixtures = require('../fixtures/models/users')

describe('users collection api endpoints', () => {
  before(function * () {
    db = yield db
    yield db.collection('users').insertMany(userFixtures.testCollection)
  })
  after(function * () {
    yield db.collection('users').drop()
  })
  describe('/POST users', () => {
    it('should insert a user', (done) => {
      let testUser = userFixtures.user
      chai.request(app)
        .post('/users')
        .send(testUser)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.have.property('_id')
          res.body.should.have.property('name')
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
  })
  describe('/GET users', () => {
    it('should create the existing user if they arent present in the db', done => {
      chai.request(app)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.have.property('_id')
          res.body.should.have.property('name')
          done()
        })
    })
    it('should return the existing user', done => {
      chai.request(app)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property('_id')
          res.body.should.have.property('name')
          done()
        })
    })
  })
})