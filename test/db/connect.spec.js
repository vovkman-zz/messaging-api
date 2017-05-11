/**
 * Created by Liam Vovk on 2017-05-04.
 */

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
const expect = chai.expect

let connect = require('../../db/connect/connect')

describe('connect', () => {
  it('should return a promise', function * () {
    expect(connect.then).to.be.a('Function')
    expect(connect.catch).to.be.a('Function')
  })
  it('should connect to the test database', function * () {
    yield connect.then( () => {
      // this is just a check to make sure the connection opens
      expect('then to be called').to.equal('then to be called')
    })
  })
})
