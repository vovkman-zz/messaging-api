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
let modelFixtures = require('../fixtures/models')

describe('users collection api endpoints', () => {
  describe('/POST users', () => {
    it('should insert a user', function * () {

    })
  })
})