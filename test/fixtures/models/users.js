/**
 * Created by Liam Vovk on 2017-05-14.
 */

module.exports.users = [
  {
    name: 'Liam TestDB',
    email: 'liam_is_swag@test.com',
    phone_number: 1234567,
    age: 21,
    account_type: 'contractor'
  },
  {
    name: 'Liam TestDB',
    email: 'liam_is_swag@test.com',
    phone_number: 1234567,
    age: 21,
    account_type: 'contractor'
  },
  {
    name: 'Liam TestDB',
    email: 'liam_is_swag@test.com',
    phone_number: 1234567,
    age: 21,
    account_type: 'contractor'
  }
]

module.exports.userId = "591a3b5a56b7e5938d136c50"

module.exports.invalidUsers =
  {
    noName: {
      email: 'liam_is_swag@test.com',
      phone_number: 1234567,
      age: 21,
      account_type: 'contractor'
    },
    noAccountType: {
      name: 'Liam TestDB',
      email: 'liam_is_swag@test.com',
      phone_number: 1234567,
      age: 21
    },
    invalidAccountType: {
      name: 'Liam TestDB',
      email: 'liam_is_swag@test.com',
      phone_number: 1234567,
      age: 21,
      account_type: 'invalid'
    }
  }