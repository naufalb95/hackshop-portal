const { User, UserData, Verification } = require('../models/index');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require("nodemailer");

const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'dbktyem00',
  api_key: '424256335419546',
  api_secret: '-cmA_6jrXw82HDUlhMmTDk1HBLs'
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'HackShop-Portal',
    allowedFormats: ['jpeg', 'jpg', 'png']
  }
});

const upload = multer({ storage });

const dataAssets = {
  bgImg: null,
  fsImg: null,
  fbImg: null,
  igImg: null
};

dataAssets.bgImg = cloudinary.url('HackShop-Portal/assets/jumbotron_bg.jpg');
dataAssets.fbImg = cloudinary.url('HackShop-Portal/assets/facebook.svg');
dataAssets.fsImg = cloudinary.url('HackShop-Portal/assets/friendster.svg');
dataAssets.igImg = cloudinary.url('HackShop-Portal/assets/instagram.svg');

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
          html: `<p>Hi ${username}, click <a href="https://hackshop-portal.herokuapp.com/verificate?id=${ verificiationNumber }">here</a> to complete your registration at HackShop Portal.</p>`
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
    let { fullName, location, phoneNumber } = req.body;
    const { userId } = req.session;

    UserData.update( {
      fullName,
      location,
      phoneNumber
    }, {
      where: {
        UserId: userId
      }
    })
      .then(() => {
      if (req.session.role === 'seller') {
      res.redirect('/seller');
    } else if (req.session.role === 'buyer') {
      res.redirect('/items');}
    })
      .catch(err => {
        const errorLists = [];
        
        err.errors.forEach((el) => {
          errorLists.push(el.message);
        });

        res.redirect(`/profile?errors=${errorLists}`);
      })
  }

  static verification(req, res) {
    const { id } = req.query;

    Verification.findOne({
      where: {
        verification: id
      },
      include: [User]
    })
      .then((data) => {
        req.session.userId = data.User.id;
        req.session.role = data.User.status;
        
        return User.update({
          isVerificated: true
        }, {
          where: {
            id: data.UserId
          }
        })
      })
      .then(() => {
        console.log('masuk destroy')
        return Verification.destroy({
          where: {
            verification: id
          }
        });
      })
      .then(() => {
        console.log(req.session);
        if (req.session.role === 'buyer') {
          res.redirect('/items');
        } else if (req.session.role === 'seller') {
          res.redirect('/seller');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static getLogin(req, res) {
    const loginObj = {
      userId: req.session.userId,
      role: req.session.role
    };
  
    res.render('login', { errors: [], loginObj, dataAssets });
  }

  static getLogout(req, res) {
    req.session.destroy();
  
    res.redirect('/');
  }

  static getRegister(req, res) {
    const { errors } = req.query;
    const loginObj = {
      userId: req.session.userId,
      role: req.session.role
    };

    let errorLists = [];
    if (errors) errorLists = errors.split(',');

    res.render('register', { errors: errorLists, loginObj, dataAssets });
  }

  static getProfile(req, res) {
    const { errors } = req.query;
    let errorLists = [];
    const loginObj = {
      userId: req.session.userId,
      role: req.session.role
    }
    
    if (errors) errorLists = errors.split(',');

    UserData.findOne({
      where: {
        UserId: req.session.userId
      }
    })
      .then((data) => {
        res.render('edit_profile', { errors: errorLists, loginObj, item: data, dataAssets });
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = AccountController;