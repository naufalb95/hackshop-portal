const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");

const { Verification, User } = require('../models');

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

const isVerificated = (req, res, next) => {
  User.findByPk(req.session.userId)
    .then((data) => {
      if (data.isVerificated) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .catch((err) => {
      res.send(err);
    })
}

router.get('/', IndexController.getIndex);

router.get('/login', IndexController.getLogin);

router.get('/logout', IndexController.getLogout);

router.get('/register', IndexController.getRegister);

router.get('/profile', isLogin, isVerificated, IndexController.getProfile);

router.get('/cart', isLogin, isVerificated, isBuyer, BuyerController.showCart);

router.get('/cart/:itemId/delete', isLogin, isVerificated, isBuyer, BuyerController.deleteFromCart);

router.post('/register', AccountController.createAccount);

router.post('/login', AccountController.checkLogin);

router.post('/edit', AccountController.postEditUser);

router.use('/seller', sellerRoutes);

router.use('/items', itemsRoutes);

router.get('/checkout', isLogin, isVerificated, isBuyer, BuyerController.checkOut);

router.get('/verificate', (req, res) => {
  const { id } = req.query;

  Verification.findOne({
    where: {
      verification: id
    },
    include: [ User ]
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
      if (req.session.role === 'buyer') {
        res.redirect('/items');
      } else if (req.session.role === 'seller') {
        res.redirect('/seller');
      } 
    })
    .catch((err) => {
      console.log(err);
    })
});

module.exports = router;