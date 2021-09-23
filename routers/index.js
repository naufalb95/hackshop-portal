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
    from: '"Naufal" <hackshop.portal@gmail.com>',
    to: "982654ant@gmail.com",
    subject: "Hello, just one step more to complete your registration at HackShop Portal",
    text: "You should enable HTML on this",
    html: `<p>Hi naufalb, click <a href="http://localhost:3000/verification=${ 'uuid' }">here</a> to complete your registration at HackShop Portal.</p>` // ! jangan lupa dirubah ke https pas push ke heroku!
    })
  .then((info) => {
    console.log(info);
  })
  .catch((err) => {
    console.log(err);
  });
});


module.exports = router;