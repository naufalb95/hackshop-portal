const { User, UserData } = require('../models/index')
const bcrypt = require('bcryptjs')
class AccountController {
  static createAccount (req, res) {
    let { username, email, password, status , fullName, location, phoneNumber } = req.body
    User.create({
      username,
      email,
      password,
      status
    })
    .then( data => {
      return UserData.create ({
        fullName,
        location,
        phoneNumber,
        UserId: data.id
      })
    })
    .then( data => {
      if( status === 'seller' ) {
        res.redirect('/seller')
      } else if ( status === 'buyer' ) {
        res.redirect('/items')
      }
    })
    .catch( err => res.send(err) )
  }
  static checkLogin (req, res) {
    User.findOne({
      where: {
        username: req.body.username
      }
    })
    .then( data => {
      if (data.password === req.body.password) {
        if (data.status === 'seller') {
          res.redirect('/seller')
        } else if ( data.status === 'buyer' ) {
          res.redirect('/items')
        }
      }
    })
    .catch( err => res.send(err) )
  }
}

module.exports = AccountController