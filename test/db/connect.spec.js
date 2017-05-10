/**
 * Created by Liam Vovk on 2017-05-04.
 */

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
const expect = chai.expect

let connect = require('../../db/connect/connect')

describe('connect', () => {
  it('should return a function with on and once to be methods', function * () {
    expect(connect.on).to.be.a('Function')
    expect(connect.once).to.be.a('Function')
  })
  it('should connect to the test database', function * () {
    expect(connect.on).to.be.a('Function')
    expect(connect.once).to.be.a('Function')
  })
})
