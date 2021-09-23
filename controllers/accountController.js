const { User, UserData, Verification } = require('../models/index');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require("nodemailer");

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

        const verificiationNumber = uuidv4();

        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: "hackshop.portal@gmail.com",
            pass: "zxcmnbcv"
          },
          logger: true,
          transactionLog: true
        });
      
        transporter.sendMail({
          from: '"HackShop Portal" <hackshop.portal@gmail.com>',
          to: `${email}`,
          subject: "Hello, just one step more to complete your registration at HackShop Portal",
          text: "You should enable HTML on this",
          html: `<p>Hi ${username}, click <a href="http://localhost:3000/verificate?id=${ verificiationNumber }">here</a> to complete your registration at HackShop Portal.</p>` // ! jangan lupa dirubah ke https pas push ke heroku!
          })
        .then((info) => {
          console.log(info);
        })
        .catch((err) => {
          console.log(err);
        });

        return Verification.create({
          UserId: data.id,
          verification: verificiationNumber
        });
      })
      .then((data) => {
        return UserData.create({
          fullName,
          location,
          phoneNumber,
          UserId: data.UserId
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
        console.log(err);
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

  static postEditUser (req, res) {
    let { fullName, location, phoneNumber } = req.body
    UserData.update( {
      fullName,
      location,
      phoneNumber
    }, {
      where: {
        id: req.session.userId
      }
    })
    .then( () => {
      if (req.session.role === 'seller') {
      res.redirect('/seller');
    } else if (req.session.role === 'buyer') {
      res.redirect('/items');}
    })
    .catch ( err => res.send(err) )
  }
}

module.exports = AccountController;