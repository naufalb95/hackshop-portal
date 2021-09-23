const express = require('express');
const router = express.Router();

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

router.get('/', IndexController.getIndex);

router.get('/login', IndexController.getLogin);

router.get('/logout', IndexController.getLogout);

router.get('/register', IndexController.getRegister);

router.get('/profile', isLogin, IndexController.getProfile);

router.get('/cart', isLogin, BuyerController.showCart);

router.get('/cart/:itemId/delete', isLogin, BuyerController.deleteFromCart);

router.post('/register', AccountController.createAccount);

router.post('/login', AccountController.checkLogin);

router.use('/seller', sellerRoutes);

router.use('/items', itemsRoutes);

router.get('/checkout', BuyerController.checkOut);


module.exports = router;