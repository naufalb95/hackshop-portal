const express = require('express');
const router = express.Router();

const BuyerController = require('../controllers/buyerController');

const { User } = require('../models');

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
    res.redirect('/');
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

router.get('/', BuyerController.showAllItem);

router.get('/:itemId', BuyerController.showDetailItem);

router.get('/:itemId/add', isLogin, isVerificated, isBuyer, BuyerController.addToCart);


module.exports = router;