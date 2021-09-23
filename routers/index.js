const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");

const BuyerController = require('../controllers/buyerController');
const AccountController = require('../controllers/accountController');
const IndexController = require('../controllers/indexController');

const sellerRoutes = require('./seller');
const itemsRoutes = require('./items');

const isLogin = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
};

const isBuyer = (req, res, next) => {
  if (req.session.role === 'buyer') {
    next();
  } else {
    res.redirect('/seller');
  }
};

router.get('/', IndexController.getIndex);

router.get('/login', IndexController.getLogin);

router.get('/logout', IndexController.getLogout);

router.get('/register', IndexController.getRegister);

router.get('/profile', isLogin, IndexController.getProfile);

router.get('/cart', isLogin, isBuyer, BuyerController.showCart);

router.get('/cart/:itemId/delete', isLogin, isBuyer, BuyerController.deleteFromCart);

router.post('/register', AccountController.createAccount);

router.post('/login', AccountController.checkLogin);

router.use('/seller', sellerRoutes);

router.use('/items', itemsRoutes);

router.get('/checkout', isLogin, isBuyer, BuyerController.checkOut);

router.get('/test', (req, res) => {
  nodemailer.createTestAccount()
    .then((testAccount) => {
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        },
      });

      return transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "982654ant@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
    })
    .then((info) => {
      console.log(info);
    })
    .catch((err) => {
      console.log(err);
    });
});


module.exports = router;