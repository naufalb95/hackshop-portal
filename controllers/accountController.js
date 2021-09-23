const { User, UserData } = require('../models/index');
const bcrypt = require('bcryptjs');

class AccountController {
  static createAccount (req, res) {
    let { username, email, password, status, fullName, location, phoneNumber } = req.body;
    const errors = [];
    
    User.create({
      username,
      email,
      password,
      status
    })
      .then(data => {
        req.session.userId = data.id;
        req.session.role = status;

        return UserData.create({
          fullName,
          location,
          phoneNumber,
          UserId: data.id
        });
      })
      .then(() => {
        if (req.session.role === 'seller') {
          res.redirect('/seller');
        } else if (req.session.role === 'buyer') {
          res.redirect('/items');
        }
      })
      .catch(err => {
        err.errors.forEach((e) => {
          errors.push(e.message);
        });

        UserData.create({
          fullName,
          location,
          phoneNumber
        })
          .then(() => {
            res.redirect(`/register?errors=${errors}`);
          })
          .catch((err) => {
            err.errors.forEach((e) => {
              errors.push(e.message);
            });

            res.redirect(`/register?errors=${errors}`);
          });
      });
  }

  static checkLogin(req, res) {
    const { email, password } = req.body;
    let isValidPassword = null;

    User.findOne({
      where: {
        email
      }
    })
      .then(data => {
        if (password) isValidPassword = bcrypt.compareSync(password, data.password);
        
        if (isValidPassword) {
          req.session.userId = data.id;
          req.session.role = data.status;
          if (req.session.role === 'seller') {
            res.redirect('/seller');
          } else if (req.session.role === 'buyer') {
            res.redirect('/items');
          }
        } else {
          res.redirect('/login');
        }
      })
      .catch(err => res.send(err));
  }
}

module.exports = AccountController;