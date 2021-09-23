const express = require('express');
const router = express.Router();

const BuyerController = require('../controllers/buyerController');

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

router.get('/', BuyerController.showAllItem);

router.get('/:itemId', BuyerController.showDetailItem);

router.get('/:itemId/add', isLogin, isBuyer, BuyerController.addToCart);


module.exports = router;